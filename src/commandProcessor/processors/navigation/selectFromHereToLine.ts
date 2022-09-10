import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const targetLineVal = value;

    // Get cursor's current position (whether currently selecting or not)
    const cursorPos = editor.selection.active;
    const cursorPosLineNum = cursorPos.line;

    // Set where the current cursor as the selection anchor
    vscode.commands.executeCommand("editor.action.setSelectionAnchor");

    // Go to the ending line
    // This converts numbers that is a word or a string into type number
    // So for example:
    // "eight" (string) = 8 (number)
    // "8" (string) = 8 (number)
    const targetLine = `${wordsToNumbers(targetLineVal) ?? targetLineVal}`;
    const targetLineNum = parseInt(targetLine) - 1;

    if (targetLineNum < cursorPosLineNum) {
      // We want to select to the beginning of targetLineNum
      const target = editor.document.lineAt(targetLineNum).range.start;
      editor.selection = new vscode.Selection(target, target);
    } else {
      // By default, select to the end of the targetLineNum
      const target = editor.document.lineAt(targetLineNum).range.end;
      editor.selection = new vscode.Selection(target, target);
    }

    // Select from anchor to cursor
    vscode.commands.executeCommand("editor.action.selectFromAnchorToCursor");
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
