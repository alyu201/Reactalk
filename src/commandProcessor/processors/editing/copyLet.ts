import * as vscode from "vscode";
import { camelize, searchEditor } from "../../utility";

export const execute = async (name: string) => {
  await searchEditor(`let ${camelize(name)}`); // throws InvalidCommandException when not found
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  await vscode.window.showInformationMessage("Copied to clipboard!");
};
