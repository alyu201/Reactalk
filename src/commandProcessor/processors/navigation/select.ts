import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { NavigationKeyword } from "../../../definitions/commandPrefixes";
import wordsToNumbers from "words-to-numbers";

export const execute = (value: string) => {
  const valueArray = value.split(" ");

  // The first word of the value is always the thing to select
  const thingToSelect = valueArray[0];

  switch (thingToSelect) {
    case NavigationKeyword.line:
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        // The value would have the structure of "select line <num>"
        const line = valueArray[1];

        // Go to the start of that line
        // This converts numbers that is a word or a string into type number
        // So for example:
        // "eight" (string) = 8 (number)
        // "8" (string) = 8 (number)
        const lineNum = `${wordsToNumbers(line) ?? line}`;
        const start = editor.document.lineAt(parseInt(lineNum) - 1).range.start;
        editor.selection = new vscode.Selection(start, start);

        // Set where the current cursor as the selection anchor
        vscode.commands.executeCommand("editor.action.setSelectionAnchor");

        // Go to the end of that SAME line
        const end = editor.document.lineAt(parseInt(lineNum) - 1).range.end;
        editor.selection = new vscode.Selection(end, end);

        // Select from anchor to cursor
        vscode.commands.executeCommand(
          "editor.action.selectFromAnchorToCursor"
        );
      } else {
        throw new InvalidCommandException(
          "Error processing navigation command"
        );
      }
      break;
    default:
      throw new InvalidCommandException("Error processing navigation command");
  }
};
