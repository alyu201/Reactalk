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

    // Calculate the target line number
    const targetLineNum = parseInt(value) - 1;

    // Get the current line number of the cursor
    const cursorPos = editor.selection.active;
    const cursorLineNum = cursorPos.line;

    if (targetLineNum < cursorLineNum) {
      // If targetLineNum is ABOVE cursorLineNum, it means we need to move up
      const howMuchToMoveUp = cursorLineNum - targetLineNum;
      vscode.commands.executeCommand("cursorMove", {
        to: "up",
        by: "line",
        value: howMuchToMoveUp,
      });
    } else {
      // If targetLineNum is UNDER cursorLineNum, it means we need to move down
      const howMuchToMoveDown = targetLineNum - cursorLineNum;
      vscode.commands.executeCommand("cursorMove", {
        to: "down",
        by: "line",
        value: howMuchToMoveDown,
      });
    }
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
