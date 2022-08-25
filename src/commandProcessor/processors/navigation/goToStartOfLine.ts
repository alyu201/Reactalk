import * as vscode from "vscode";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    // This converts numbers that is a word or a string into type number
    // So for example:
    // "eight" (string) = 8 (number)
    // "8" (string) = 8 (number)
    value = `${wordsToNumbers(value) ?? value}`;

    const start = editor.document.lineAt(parseInt(value) - 1).range.start;
    editor.selection = new vscode.Selection(start, start);
  }
};
