import { SystemPrefixes } from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "./../invalidCommandException";
import * as vscode from "vscode";

/**
 * @param prefix The prefix of the system command to process
 * @param cmd The transcribed system command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processSystem = (
  prefix: string,
  sysCmdCategory?: string,
  sysCmdValue?: string
) => {
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
        const sysMod = require(`./system/${sysCmdCategory}/${prefix}`);
        sysMod.execute(sysCmdValue);
      } catch (error) {
        try {
          const sysMod = require(`./system/${prefix}`);
          sysMod.execute();
        } catch (error) {
          throw new InvalidCommandException("Error processing system command");
        }
        //throw new InvalidCommandException("Error processing system command");
      }
  }
};
