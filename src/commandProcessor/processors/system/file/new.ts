import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue == "") {
    vscode.commands.executeCommand("workbench.action.files.newUntitledFile");
  }
};
