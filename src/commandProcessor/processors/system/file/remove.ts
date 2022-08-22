import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue == "") {
    // Note: To disable the 'moveFileToTrash' warning, look in inputProcessor.ts

    vscode.commands.executeCommand("moveFileToTrash");
  }
};
