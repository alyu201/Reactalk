import {
  CompositionKeyword,
  CompositionListKeyword,
  CompositionSymbolKeyword,
  CompositionTextKeyword,
} from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as commands from "../../definitions/codeSnippets.json";
import * as vscode from "vscode";
import { parseSymbols } from "../utility";
import wordsToNumbers from "words-to-numbers";

interface Command {
  cmd: string;
  snippet: string;
}

/**
 * @param command The command string to search for the code snippet to be performed by VSCode
 */
const findSnippet = (command: string) => {
  // Preprocessing for 'add element button <name>' command
  let name = "$1";
  if (command.includes("button") && command.split(" ").length > 3) {
    name = command.split(" ").pop() ?? "$1";
    command = command.split(" ").slice(0, 3).join(" ");
  }

  const snippet = commands
    .filter(({ cmd }: Command) => {
      return cmd === wordsToNumbers(command);
    })[0]
    .snippet.replace("$1", name);

  return snippet;
};

/**
 * @param snippet The code snippet to insert into the editor of VSCode
 */
export const insertSnippet = (snippet: string) => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.insertSnippet(new vscode.SnippetString(snippet));
  }
};

const insertText = (text: string, type: string) => {
  insertSnippet(text);
  vscode.commands.executeCommand("jumpToNextSnippetPlaceholder");

  if (type === CompositionTextKeyword.comment) {
    vscode.commands.executeCommand("editor.action.commentLine");
    vscode.commands.executeCommand("editor.action.insertLineAfter");
  }
};

const insertList = (command: string, list: string) => {
  // Find whether the list items are variables defined in the current file
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const documentText = editor.document.getText();
    const items = list.split(" ");
    let processedList: any = [];

    // If the items are not defined variables, return them as list of strings
    items.map((item) => {
      const matches = documentText.match(new RegExp(`${item}[ \t\r\n\v\f]*=[^=]`, "g"));
      !matches || (matches && matches.length === 0)
        ? processedList.push(`'${item}'`)
        : processedList.push(item);
    });
    return findSnippet(command).replace("$1", processedList.join(", "));
  }

  return "";
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

    console.log("value", insertCode);
    console.log("command", command);

    keyword in CompositionTextKeyword
      ? insertText(insertCode, keyword)
      : keyword in CompositionSymbolKeyword
      ? insertSnippet(parseSymbols(insertCode))
      : keyword in CompositionKeyword // commands not requiring user specified code
      ? insertSnippet(findSnippet(inputCmd))
      : keyword in CompositionListKeyword // commands requiring comma-separated list of user-given inputs
      ? insertSnippet(insertList(command, insertCode))
      : insertSnippet(
          findSnippet(command).replace(new RegExp("\\$1", "g"), parseSymbols(insertCode))
        ); // commands requiring user specified code with system defined
  } catch (error) {
    console.log(error);
    throw new InvalidCommandException("Error processing composition command");
  }
};
