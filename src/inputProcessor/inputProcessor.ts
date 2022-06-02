import { processCommand } from "../commandProcessor/commandProcessor";

function startVP(transcript:string) {

    // Ask command processor to process command
    processCommand(transcript.trim());
}

export default startVP;