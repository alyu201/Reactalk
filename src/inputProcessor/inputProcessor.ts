import { processCommand } from "../commandProcessor/commandProcessor";
import { InvalidCommandException } from "../commandProcessor/invalidCommandException";

function startVP(transcript:string) {

    try {
        // Ask command processor to process command
        processCommand(transcript.trim());
    } catch (error) {
        if (error instanceof InvalidCommandException) {
            console.log("InvalidCommandException thrown")
        }
      }
}

export default startVP;