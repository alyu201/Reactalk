import { processCommand } from "../commandProcessor/commandProcessor";
import { InvalidCommandException } from "../commandProcessor/invalidCommandException";

function startVP(transcript: string) {
  try {
    // Preprocess transcript
    const processedTranscript = transcript.trim().toLowerCase();

    // Ask command processor to process command
    processCommand(processedTranscript);
  } catch (error) {
    if (error instanceof InvalidCommandException) {
      console.log("InvalidCommandException thrown");
    }
  }
}

export default startVP;
