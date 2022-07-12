import * as vscode from "vscode";

 export const execute = () => {
    console.log("meow");

    //vscode.commands.executeCommand('revealInExplorer');
    //vscode.commands.executeCommand('revealInExplorer', vscode.Uri.parse('Testing\ MVP/findMe.ts'));
    const prefix = "test";
    vscode.commands.executeCommand('workbench.action.quickOpen', prefix);
    //vscode.commands.executeCommand('list.focusDown');
 }