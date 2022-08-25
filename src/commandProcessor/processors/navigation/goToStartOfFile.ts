import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    vscode.commands.executeCommand("cursorTop");
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
