import * as vscode from 'vscode';

function processCmd(transcript:string) {

    vscode.window.showInformationMessage(transcript);
}

export default processCmd;