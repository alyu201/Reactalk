import * as vscode from "vscode";
import { NavigationKeyword } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";
import { takeCareOfToAndFor } from "./navigationUtility";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  const valueArray = value.split(" ");

  // The first word of the value is always the direction
  const directionOrEditor = valueArray[0];

  switch (directionOrEditor) {
    case NavigationKeyword.up:
      if (valueArray.length > 1) {
        // The value will have the structure of "<direction> by <num>", so we need to remove the "by "
        const valueNum = valueArray[2];
        const amtToMove = takeCareOfToAndFor(valueNum);
        const amtToMoveNum = parseInt(
          `${wordsToNumbers(amtToMove) ?? amtToMove}`
        );

        for (let i = 1; i <= amtToMoveNum; i++) {
          vscode.commands.executeCommand("list.focusUp");
        }
      } else {
        // By default, focus up 1 time
        vscode.commands.executeCommand("list.focusUp");
      }

      break;
    case NavigationKeyword.down:
      if (valueArray.length > 1) {
        // The value will have the structure of "<direction> by <num>", so we need to remove the "by "
        const valueNum = valueArray[2];
        const amtToMove = takeCareOfToAndFor(valueNum);
        const amtToMoveNum = parseInt(
          `${wordsToNumbers(amtToMove) ?? amtToMove}`
        );

        for (let i = 1; i <= amtToMoveNum; i++) {
          vscode.commands.executeCommand("list.focusDown");
        }
      } else {
        // By default, focus down 1 time
        vscode.commands.executeCommand("list.focusDown");
      }

      break;
    case NavigationKeyword.editor:
      vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup");
      break;
    case NavigationKeyword.commands:
      vscode.commands.executeCommand("reactalk-commands.focus");
      break;
    case NavigationKeyword.symbols:
      vscode.commands.executeCommand("reactalk-symbols.focus");
      break;
    case NavigationKeyword.status:
      vscode.commands.executeCommand("reactalk-controls.focus");
      break;
    default:
      throw new InvalidCommandException("Error processing navigation command");
  }
};
