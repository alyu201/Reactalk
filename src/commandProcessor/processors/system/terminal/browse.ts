import * as vscode from "vscode";
import { SystemKeyword } from "../../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../../invalidCommandException";

export const execute = (sysCmdValue: string) => {
  switch (sysCmdValue) {
    case SystemKeyword.history:
      vscode.commands.executeCommand(
        "workbench.action.terminal.runRecentCommand"
      );
      break;
    default:
      throw new InvalidCommandException("Error processing navigation command");
  }
};
