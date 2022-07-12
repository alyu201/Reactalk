import * as vscode from "vscode";

 export const execute = () => {
    console.log("tring to go enter")

    // This one doesn't do what we wanted to do, but it is interesting
    //vscode.commands.executeCommand('workbench.action.quickOpenView');

    
    vscode.commands.executeCommand('workbench.action.focusQuickOpen');
    

 }