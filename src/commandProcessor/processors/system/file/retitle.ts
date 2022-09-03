import * as vscode from "vscode";
import clipboardy from "clipboardy";

export const execute = (sysCmdValue: string) => {
  vscode.commands.executeCommand("renameFile");

  // Copy to clipboard
  const promise = clipboardy.write(sysCmdValue);

  promise.then((value: any) => {
    // Paste the new filename from clipboard
    vscode.commands
      .executeCommand("editor.action.clipboardPasteAction")
      .then(function () {
        vscode.commands.executeCommand(
          "workbench.files.action.focusFilesExplorer"
        );
      });
  });
};
