import { processCommand } from "../commandProcessor/commandProcessor";
import { InvalidCommandException } from "../commandProcessor/invalidCommandException";
import { STATUS } from "../definitions/status";
import { ListeningCommands } from "../definitions/commandPrefixes";

function startVP(transcript: string) {
  try {
    // Preprocess transcript
    const processedTranscript = transcript.trim().toLowerCase();

    if (ReactalkStatus == STATUS.LISTEN) {
      console.log(">>> We want to process command");
      // Ask command processor to process command
      processCommand(processedTranscript);
    } else if (ReactalkStatus == STATUS.PAUSE) {
      if (processedTranscript == ListeningCommands.startListening) {
        console.log(">>> We want to start processing commands again!");
        ReactalkStatus = STATUS.LISTEN;
        // Ask command processor to process command
        processCommand(processedTranscript);
      } else {
        console.log(
          ">>> We want to process command only for start/stop listening"
        );
      }
    }
  } catch (error) {
    if (error instanceof InvalidCommandException) {
      console.log("InvalidCommandException thrown");
    }
  }
}

export default startVP;
