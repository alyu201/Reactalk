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
  const keyword = inputCmd.split(" ")[1]; // e.g. for, element

  if (keyword in CompositionKeyword) {
    const action = commands.filter(({ cmd }: Command) => {
      return cmd === inputCmd;
    })[0].action;

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.insertSnippet(new vscode.SnippetString(action));
    }
  } else {
    throw new InvalidCommandException(errorMsg);
  }
};
