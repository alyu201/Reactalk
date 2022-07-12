import { CompositionKeyword } from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as commands from "../../definitions/codeSnippets.json";
import * as vscode from "vscode";
import { parseCommandSymbols } from "../utility";

interface Command {
  cmd: string;
  snippet: string;
}

/**
 * @param command The command string to search for the code snippet to be performed by VSCode
 */
const findSnippet = (command: string) => {
  return commands.filter(({ cmd }: Command) => {
    return cmd === command;
  })[0].snippet;
};

/**
 * @param snippet The code snippet to insert into the editor of VSCode
 */
const insertSnippet = (snippet: string) => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.insertSnippet(new vscode.SnippetString(snippet));
  }
};

const insertText = (text: string) => {
  insertSnippet(text);
  vscode.commands.executeCommand("jumpToNextSnippetPlaceholder");
};

/**
 * @param inputCmd The complete, transcribed composition command to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processAdd = (inputCmd: string) => {
  try {
    const keyword = inputCmd.split(" ")[1]; // e.g. for, element
    const insertCode = inputCmd.split(" ").slice(2).join(" ");
    const command = inputCmd.substring(0, inputCmd.length - insertCode.length).trim();

    // console.log("value", insertCode);
    // console.log("command", command);

    keyword === CompositionKeyword.text
      ? insertText(insertCode)
      : keyword === CompositionKeyword.symbol
      ? insertSnippet(parseCommandSymbols(insertCode))
      : keyword in CompositionKeyword // commands not requiring user specified code
      ? insertSnippet(findSnippet(inputCmd))
      : insertSnippet(findSnippet(command).replace("$1", insertCode)); // commands requiring user specified code with system defined
  } catch (error) {
    console.log(error);
    throw new InvalidCommandException("Error processing composition command");
  }
};
