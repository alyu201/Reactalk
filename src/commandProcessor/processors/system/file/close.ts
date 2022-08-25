import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  vscode.commands
    .executeCommand("workbench.action.focusActiveEditorGroup")
    .then(function () {
      vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    });
};
