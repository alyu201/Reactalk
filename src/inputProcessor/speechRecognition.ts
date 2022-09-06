import startVP from "./inputProcessor";
import { STATUS, Status } from "../definitions/status";
import * as vscode from "vscode";

const encoding = "LINEAR16";
const sampleRateHertz = 16000;
const languageCode = "en-US";
const streamingLimit = 50000; // ms - set to low number for demo purposes

const chalk = require("chalk");
const { Writable } = require("stream");
const recorder = require("node-record-lpcm16");

// Imports the Google Cloud client library
// Currently, only v1p1beta1 contains result-end-time
const speech = require("@google-cloud/speech").v1p1beta1;

const client = new speech.SpeechClient();

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const request = {
  config,
  interimResults: false, // If you want interim results, set this to true
};

let recognizeStream: any = null;
let restartCounter = 0;
let audioInput: any = [];
let lastAudioInput: any = [];
let resultEndTime = 0;
let isFinalEndTime = 0;
let finalRequestEndTime = 0;
let newStream = true;
let bridgingOffset = 0;
let lastTranscriptWasFinal = false;
let timeout: any = null;

const statusConfigurator = Status.getStatusInstance();

// This will disable the remove file warning AND any files deleted will go to the computer's trash.
async function disableRemoveFileWarning() {
  /**
   * Note, these commands are directly editing the settings.json of the user's interface.
   * This is how the update function works: (<nameOfSection>, <valueToChangeTo>, true)
   * The update function will still work even if the section didn't exist.
   * So, in our case, if "files.enableTrash" wasn't there, it will make its own "files.enableTrash".
   */

  await vscode.workspace
    .getConfiguration()
    .update("files.enableTrash", true, true);

  await vscode.workspace
    .getConfiguration()
    .update("explorer.confirmDelete", false, true);
}

function startStream() {
  // Clear current audioInput
  audioInput = [];
  // Initiate (Reinitiate) a recognize stream
  recognizeStream = client
    .streamingRecognize(request)
    .on("error", (err: any) => {
      if (err.code === 11) {
        // restartStream();
      } else {
        console.error("API request error " + err);
        vscode.window.showInformationMessage("Timeout reached.");
      }
    })
    .on("data", speechCallback);

  // Restart stream when streamingLimit expires
  timeout = setTimeout(restartStream, streamingLimit);
}

const speechCallback = (stream: any) => {
  // Convert API result end time from seconds + nanoseconds to milliseconds
  resultEndTime =
    stream.results[0].resultEndTime.seconds * 1000 +
    Math.round(stream.results[0].resultEndTime.nanos / 1000000);

  if (stream.results[0].isFinal) {
    isFinalEndTime = resultEndTime;
    lastTranscriptWasFinal = true;

    let transcript: string = stream.results[0].alternatives[0].transcript;

    // Initiate the voice programming process by first going to inputProcessor.ts
    startVP(transcript);

    // We can comment this out later, it just prints the transcript to the terminal
    process.stdout.write(
      stream.results[0].alternatives[0].transcript
        ? `Transcription: ${transcript}\n`
        : "\n\nReached transcription time limit, press Ctrl+C\n"
    );

    // This will update the transcript in Reactalk's side bar
    Status.getStatusInstance().updateCommand(transcript);

    const reactalkStatus = statusConfigurator.getStatus();

    if (reactalkStatus === STATUS.STOP) {
      vscode.window.showInformationMessage("Thanks for using Reactalk!");
      clearTimeout(timeout);
      stream.destroy();
    }

    console.log("\n");
  } else {
    lastTranscriptWasFinal = false;
  }
};

const audioInputStreamTransform = new Writable({
  write(chunk: any, encoding: any, next: any) {
    if (newStream && lastAudioInput.length !== 0) {
      // Approximate math to calculate time of chunks
      const chunkTime = streamingLimit / lastAudioInput.length;
      if (chunkTime !== 0) {
        if (bridgingOffset < 0) {
          bridgingOffset = 0;
        }
        if (bridgingOffset > finalRequestEndTime) {
          bridgingOffset = finalRequestEndTime;
        }
        const chunksFromMS = Math.floor(
          (finalRequestEndTime - bridgingOffset) / chunkTime
        );
        bridgingOffset = Math.floor(
          (lastAudioInput.length - chunksFromMS) * chunkTime
        );

        for (let i = chunksFromMS; i < lastAudioInput.length; i++) {
          recognizeStream.write(lastAudioInput[i]);
        }
      }
      newStream = false;
    }

    audioInput.push(chunk);

    if (recognizeStream) {
      recognizeStream.write(chunk);
    }

    next();
  },

  final() {
    if (recognizeStream) {
      recognizeStream.end();
    }
  },
});

function restartStream() {
  if (recognizeStream) {
    recognizeStream.end();
    recognizeStream.removeListener("data", speechCallback);
    recognizeStream = null;
  }
  if (resultEndTime > 0) {
    finalRequestEndTime = isFinalEndTime;
  }
  resultEndTime = 0;

  lastAudioInput = [];
  lastAudioInput = audioInput;

  restartCounter++;

  if (!lastTranscriptWasFinal) {
    process.stdout.write("\n");
  }
  process.stdout.write(
    chalk.yellow(`${streamingLimit * restartCounter}: RESTARTING REQUEST\n`)
  );

  newStream = true;

  startStream();
}
// Start recording and send the microphone input to the Speech API
recorder
  .record({
    sampleRateHertz: sampleRateHertz,
    threshold: 0, // Silence threshold
    silence: 1000,
    keepSilence: true,
    recordProgram: "sox", // Try also "arecord" or "sox"
  })
  .stream()
  .on("error", (err: any) => {
    console.error("Audio recording error " + err);
  })
  .pipe(audioInputStreamTransform);

// This is where all the initialising stuff happens. This function will only run once at the start.
export function startListening() {
  console.log("");
  console.log("Listening, press Ctrl+C to stop.");
  console.log("");
  console.log("End (ms)       Transcript Results/Status");
  console.log("=========================================================");

  //console.log("WE are at speechCallback");
  // This will disable the warning that appears when trying to remove a file to trash
  // AND any files deleted will go to the computer's trash.
  disableRemoveFileWarning();

  // Initialise ReactalkStatus to LISTEN
  statusConfigurator.updateStatus(STATUS.LISTEN);

  startStream();
}
