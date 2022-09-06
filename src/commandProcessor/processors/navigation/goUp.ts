import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { takeCareOfToAndFor } from "./navigationUtility";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  console.log("value: " + value);

  if (editor) {
    // Yes the value will be "by <num>", so we need to remove the "by "
    // It is prefered to have the by in the value rather than in the filename "goUpBy.js" as "by" is not really a keyword.
    const valueNum = value.replace(/by /gi, "");
    const amtToMove = takeCareOfToAndFor(valueNum);
    const amtToMoveNum = `${wordsToNumbers(amtToMove) ?? amtToMove}`;
    vscode.commands.executeCommand("cursorMove", {
      to: "up",
      by: "line",
      value: parseInt(amtToMoveNum),
    });
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
