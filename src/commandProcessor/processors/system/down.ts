import * as vscode from "vscode";

 export const execute = () => {
    console.log("tring to go down")

    vscode.commands.executeCommand('workbench.action.quickOpenNavigateNextInEditorPicker');

 }