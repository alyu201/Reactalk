import { SystemPrefixes } from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "./../invalidCommandException";
import * as vscode from "vscode";

const errorMsg = "Error processing system command";

/**
 * @param prefix The prefix of the system command to process
 * @param cmd The transcribed system command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processSystem = (prefix: string, sysCmdCategory?: string, cmd?: string) => {
  switch (prefix) {
    case SystemPrefixes.undo:
      vscode.commands.executeCommand("undo");
      break;
    case SystemPrefixes.redo:
      vscode.commands.executeCommand("redo");
      break;
    case SystemPrefixes.save:
      vscode.commands.executeCommand("workbench.action.files.save");
      break;
    default:
      throw new InvalidCommandException(errorMsg);
  }
};

