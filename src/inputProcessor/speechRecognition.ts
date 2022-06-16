import startVP from './inputProcessor';
import * as vscode from 'vscode';

export function startListening() {
  const recorder = require('node-record-lpcm16');

  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');

  // Creates a client
  const client = new speech.SpeechClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const encoding = 'LINEAR16';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

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
    .on('error', (error:any) => {
      console.log(error);
      console.log("It came here")
      vscode.window.showInformationMessage("Timeout reached.");
    }
)
    .on('data', (data: { results: { alternatives: { transcript: any; }[]; }[]; }) =>
      {
        if (data.results[0] && data.results[0].alternatives[0]) {

          let transcript:string = data.results[0].alternatives[0].transcript;

          transcript = "go right";

          // Initiate the voice programming process by first going to inputProcessor.ts
          startVP(transcript);

          // We can comment this out later, it just prints the transcript to the terminal
          process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
              ? `Transcription: ${transcript}\n`
              : '\n\nReached transcription time limit, press Ctrl+C\n'
          )

          console.log("\n")
        } 

      }
    );

  // Start recording and send the microphone input to the Speech API.
  // Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
    console.log('Listening, press Ctrl+C to stop.');
    recorder
    .record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: false,
      recordProgram: 'sox',
      silence: '10.0',
    })
    .stream()
    .on('error', () => {
      console.error;
      console.log("It came from the recorder instead")
    })
    .pipe(recognizeStream);

}
