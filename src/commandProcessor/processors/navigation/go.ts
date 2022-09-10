import * as vscode from "vscode";
import { NavigationKeyword } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";
import { takeCareOfToAndFor } from "./navigationUtility";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  const valueArray = value.split(" ");

  // The first word of the value is always the direction
  const direction = valueArray[0];

  if (valueArray.length > 1) {
    // The value will have the structure of "<direction> by <num>", so we need to remove the "by "
    const valueNum = valueArray[2];
    const amtToMove = takeCareOfToAndFor(valueNum);
    const amtToMoveNum = `${wordsToNumbers(amtToMove) ?? amtToMove}`;

    switch (direction) {
      case NavigationKeyword.up:
        vscode.commands.executeCommand("cursorMove", {
          to: "up",
          by: "line",
          value: parseInt(amtToMoveNum),
        });
        break;
      case NavigationKeyword.down:
        console.log("We want to go down by x amount");
        vscode.commands.executeCommand("cursorMove", {
          to: "down",
          by: "line",
          value: parseInt(amtToMoveNum),
        });
        break;
      case NavigationKeyword.left:
        vscode.commands.executeCommand("cursorMove", {
          to: "left",
          by: "character",
          value: parseInt(amtToMoveNum),
        });
        break;
      case NavigationKeyword.right:
        vscode.commands.executeCommand("cursorMove", {
          to: "right",
          by: "character",
          value: parseInt(amtToMoveNum),
        });
        break;
      default:
        throw new InvalidCommandException(
          "Error processing navigation command"
        );
    }
  } else {
    switch (direction) {
      case NavigationKeyword.up:
        // By default go up by 1
        vscode.commands.executeCommand("cursorMove", { to: "up", by: "line" });
        break;
      case NavigationKeyword.down:
        // By default go up by 1
        vscode.commands.executeCommand("cursorMove", {
          to: "down",
          by: "line",
        });
        break;
      case NavigationKeyword.left:
        vscode.commands.executeCommand("cursorMove", {
          to: "left",
          by: "character",
        });
        break;
      case NavigationKeyword.right:
        vscode.commands.executeCommand("cursorMove", {
          to: "right",
          by: "character",
        });
        break;
      default:
        throw new InvalidCommandException(
          "Error processing navigation command"
        );
    }
  }
};
