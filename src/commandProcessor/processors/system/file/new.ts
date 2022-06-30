import * as vscode from "vscode";

 export const execute = () => {
    console.log("hello");

    vscode.commands.executeCommand("workbench.action.files.newUntitledFile");
 }