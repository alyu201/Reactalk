import processCmd from '../cmdProcessor/dummyCmdProcessor';

function startVP(transcript:string) {

    // Ask command processor to process command
    processCmd(transcript.trim());
}

export default startVP;