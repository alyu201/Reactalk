import * as vscode from "vscode";
import { insertSnippet } from "../../compositionProcessor";

export const execute = async (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue === "") {
    await vscode.commands.executeCommand("workbench.action.files.newUntitledFile");
    await vscode.commands.executeCommand("workbench.files.action.focusFilesExplorer");

    insertSnippet("import React from 'react';");
  }
};
