import * as vscode from "vscode";
import { camelize, searchEditor } from "../../utility";

const copy = async (name: string) => {
  await searchEditor(`const ${camelize(name)}`);
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  await vscode.window.showInformationMessage("Copied to clipboard!");
};

export const execute = (name: string) => {
  copy(name);
};
