import * as vscode from "vscode";

export const execute = () => {
  vscode.commands.executeCommand("editor.action.clipboardPasteAction");
};
