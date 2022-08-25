import * as vscode from "vscode";

export const execute = () => {
  vscode.commands.executeCommand("workbench.files.action.focusFilesExplorer");
};
