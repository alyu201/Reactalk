import * as vscode from "vscode";
import { NavigationKeyword } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  switch (value) {
    case NavigationKeyword.up:
      vscode.commands.executeCommand("list.focusUp");
      break;
    case NavigationKeyword.down:
      vscode.commands.executeCommand("list.focusDown");
      break;
    case NavigationKeyword.terminal:
      vscode.commands.executeCommand(
        "workbench.action.terminal.toggleTerminal"
      );
      break;
    case NavigationKeyword.editor:
      vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup");
      break;
    default:
      throw new InvalidCommandException("Error processing navigation command");
  }
};
