import * as vscode from "vscode";
import wordsToNumbers from "words-to-numbers";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    // This converts numbers that is a word or a string into type number
    // So for example:
    // "eight" (string) = 8 (number)
    // "8" (string) = 8 (number)
    value = `${wordsToNumbers(value) ?? value}`;

    const end = editor.document.lineAt(parseInt(value) - 1).range.end;
    editor.selection = new vscode.Selection(end, end);
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
