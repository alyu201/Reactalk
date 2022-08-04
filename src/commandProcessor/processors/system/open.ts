import * as vscode from "vscode";

export const execute = () => {
  vscode.commands
    .executeCommand("filesExplorer.openFilePreserveFocus")
    .then(function () {
      vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup");
    });
};
