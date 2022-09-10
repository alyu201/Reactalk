import * as vscode from "vscode";
import { NavigationKeyword } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (direction: string) => {
  switch (direction) {
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
    default:
      throw new InvalidCommandException("Error processing navigation command");
  }
};
