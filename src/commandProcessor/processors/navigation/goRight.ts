import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const valueNum = value.replace(/by /gi, "");
    console.log("valueNum: " + valueNum);
    const amtToMove = takeCareOfToAndFor(valueNum);
    const amtToMoveNum = `${wordsToNumbers(amtToMove) ?? amtToMove}`;
    vscode.commands.executeCommand("cursorMove", {
      to: "right",
      by: "character",
      value: parseInt(amtToMoveNum),
    });
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};

function takeCareOfToAndFor(value: string) {
  if (value === "to") {
    return "2";
  } else if (value === "for") {
    return "4";
  } else {
    return value;
  }
}
