import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  vscode.commands.executeCommand("filesExplorer.copy").then(function () {
    vscode.commands.executeCommand("filesExplorer.paste").then(function () {
      vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup");
    });
  });
};
