import { processCommand } from "../commandProcessor/commandProcessor";
import { InvalidCommandException } from "../commandProcessor/invalidCommandException";
import { Status, STATUS } from "../definitions/status";
import { ListeningCommands } from "../definitions/commandPrefixes";

function startVP(transcript: string) {
  try {
    // Preprocess transcript
    const processedTranscript = transcript.trim().toLowerCase();

    const statusConfigurator = Status.getStatusInstance();
    const reactalkStatus = statusConfigurator.getStatus();
    if (reactalkStatus === STATUS.LISTEN) {
      // Ask command processor to process command
      processCommand(processedTranscript);
    } else if (reactalkStatus === STATUS.PAUSE) {
      if (processedTranscript === ListeningCommands.startListening) {
        statusConfigurator.updateStatus(STATUS.LISTEN);
        // Ask command processor to process command
        processCommand(processedTranscript);
      } else if (processedTranscript === ListeningCommands.stopListening) {
        statusConfigurator.updateStatus(STATUS.STOP);
      }
    }
  } catch (error) {
    if (error instanceof InvalidCommandException) {
      console.log("InvalidCommandException thrown");
    }
  }
}

export default startVP;
