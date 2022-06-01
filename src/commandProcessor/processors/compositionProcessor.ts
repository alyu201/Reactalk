import { CompositionKeyword } from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as commands from "../../definitions/codeSnippets.json";
import * as vscode from "vscode";

interface Command {
  cmd: string;
  action: string;
}

const errorMsg = "Error processing composition command";

/**
 * @param inputCmd The complete, transcribed composition command to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processAdd = (inputCmd: string) => {
  const keyword = inputCmd.split(" ")[1];

  switch (keyword) {
    case CompositionKeyword.for:
      const action = commands.filter(({ cmd }: Command) => {
        return cmd.toLowerCase() === inputCmd;
      })[0].action;

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(action));
      }
      break;
    default:
      throw new InvalidCommandException(errorMsg);
  }
};
