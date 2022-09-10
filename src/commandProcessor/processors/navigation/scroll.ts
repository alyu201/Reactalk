import * as vscode from "vscode";
import { NavigationKeyword } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const valueArray = value.split(" ");

  // The first word of the value is always the direction
  const directionOrFiles = valueArray[0];

  switch (directionOrFiles) {
    case NavigationKeyword.up:
      vscode.commands.executeCommand("editorScroll", {
        to: "up",
        by: "line",
        value: 5,
      });
      break;
    case NavigationKeyword.down:
      vscode.commands.executeCommand("editorScroll", {
        to: "down",
        by: "line",
        value: 5,
      });
      break;
    case NavigationKeyword.files:
      if (valueArray.length > 1) {
        // The value will have the structure of "files <direction>", so we need to remove the "by "
        const direction = valueArray[1];

        switch (direction) {
          case NavigationKeyword.up:
            for (let i = 1; i <= 10; i++) {
              vscode.commands.executeCommand("list.scrollUp");
            }
            break;
          case NavigationKeyword.down:
            for (let i = 1; i <= 10; i++) {
              vscode.commands.executeCommand("list.scrollDown");
            }
            break;
          default:
            throw new InvalidCommandException(
              "Error processing navigation command"
            );
        }
      } else {
        throw new InvalidCommandException(
          "Error processing navigation command"
        );
      }

      break;
    default:
      throw new InvalidCommandException("Error processing navigation command");
  }
};
