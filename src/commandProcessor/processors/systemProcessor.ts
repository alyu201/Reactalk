import { SystemPrefixes } from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "./../invalidCommandException";
import * as vscode from "vscode";

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
      try {
        const navMod = require(`./system/${sysCmdCategory}/${prefix}`);
        navMod.execute();
      } catch (error) {
        throw new InvalidCommandException("Error processing system command");
      }
  }
};

