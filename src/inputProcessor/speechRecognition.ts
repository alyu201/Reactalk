import startVP from "./inputProcessor";
import { STATUS, Status } from "../definitions/status";
import * as vscode from "vscode";

// This will disable the remove file warning AND any files deleted will go to the computer's trash.
async function disableRemoveFileWarning() {
  /**
   * Note, these commands are directly editing the settings.json of the user's interface.
   * This is how the update function works: (<nameOfSection>, <valueToChangeTo>, true)
   * The update function will still work even if the section didn't exist.
   * So, in our case, if "files.enableTrash" wasn't there, it will make its own "files.enableTrash".
   */

  await vscode.workspace.getConfiguration().update("files.enableTrash", true, true);

  await vscode.workspace.getConfiguration().update("explorer.confirmDelete", false, true);
}

// This sets up the Google Speech service
export function startListening() {
  // This will disable the warning that appears when trying to remove a file to trash
  // AND any files deleted will go to the computer's trash.
  disableRemoveFileWarning();

  // Initialise reactalkStatus to LISTEN
  const statusConfigurator = Status.getStatusInstance();
  const reactalkStatus = statusConfigurator.getStatus();
  statusConfigurator.updateStatus(STATUS.LISTEN);

  const recorder = require("node-record-lpcm16");

  // Imports the Google Cloud client library
  const speech = require("@google-cloud/speech");

  // Creates a client
  const client = new speech.SpeechClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const encoding = "LINEAR16";
  const sampleRateHertz = 16000;
  const languageCode = "en-US";

  const request = {
    config: {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
    },
    interimResults: false, // If you want interim results, set this to true
  };

  // Create a recognize stream
  const recognizeStream = client
    .streamingRecognize(request)
    .on("error", (error: any) => {
      console.log(error);
      console.log("It came here");
      vscode.window.showInformationMessage("Timeout reached.");
    })
    .on("data", (data: { results: { alternatives: { transcript: any }[] }[] }) => {
      if (data.results[0] && data.results[0].alternatives[0]) {
        let transcript: string = data.results[0].alternatives[0].transcript;

        // Initiate the voice programming process by first going to inputProcessor.ts
        startVP(transcript);

        // We can comment this out later, it just prints the transcript to the terminal
        process.stdout.write(
          data.results[0] && data.results[0].alternatives[0]
            ? `Transcription: ${transcript}\n`
            : "\n\nReached transcription time limit, press Ctrl+C\n"
        );
        Status.getStatusInstance().updateCommand(transcript);

        if (reactalkStatus === STATUS.STOP) {
          vscode.window.showInformationMessage("Thanks for using Reactalk!");
          recognizeStream.destroy();
        }

        console.log("\n");
      }
    });

  // Start recording and send the microphone input to the Speech API.
  // Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
  console.log("Listening, press Ctrl+C to stop.");
  recorder
    .record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: false,
      recordProgram: "sox",
      silence: "10.0",
    })
    .stream()
    .on("error", (error: any) => {
      console.error(error);
      console.log("It came from the recorder instead");
    })
    .pipe(recognizeStream);
}
