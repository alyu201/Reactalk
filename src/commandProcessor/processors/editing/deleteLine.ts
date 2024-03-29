import * as vscode from "vscode";
import wordsToNumbers from "words-to-numbers";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;
  value = `${wordsToNumbers(value) ?? value}`;

  try {
    if (editor) {
      const range = editor.document.lineAt(parseInt(value) - 1).range;
      const line = (editor.selection = new vscode.Selection(range.start, range.end));

      editor.edit((builder) => {
        builder.replace(line, "");
      });
    }
  } catch (error) {
    throw new InvalidCommandException("Error processing editing command");
  }
};
