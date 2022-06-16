import {
  EditingKeyword,
  EditingPrefixes,
  EditingValue,
} from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as vscode from "vscode";
import { Selection } from "vscode";

const errorMsg = "Error processing editing command";
const editor = vscode.window.activeTextEditor;

/**
 * @param prefix The prefix of the editing command to process
 * @param cmd The transcribed editing command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processEdit = (prefix: string, cmd: string) => {
  switch (prefix) {
    case EditingPrefixes.delete:
      const keyword = cmd.split(" ")[0];
      const value = cmd.split(" ")[1];
      deleteEdit(keyword, value);
      break;
    default:
      throw new InvalidCommandException(errorMsg);
  }
};

/**
 * @param selection The selection from the editor to remove
 */
const deleteFromEditor = (selection: Selection) => {
  if (editor) {
    editor.edit((builder) => {
      builder.replace(selection, "");
    });
  }
};

/**
 * @param keyword The keyword used to determine the type of code to delete
 * @param value The value to identify the code to delete by
 * @throws An InvalidCommandException when an error occurs during processing
 */
const deleteEdit = (keyword: string, value: string) => {
  if (editor) {
    switch (keyword) {
      case EditingKeyword.line:
        const range = editor.document.lineAt(parseInt(value) - 1).range;
        const line = (editor.selection = new vscode.Selection(
          range.start,
          range.end
        ));

        deleteFromEditor(line);
        break;
      case EditingKeyword.element:
        const documentText = editor.document.getText();
        const endTag = "</p>";
        // if (value in EditingValue) {
        // Find indices of all occurences of the specified element
        const openingMatches = [
          ...documentText.matchAll(new RegExp("<p>", "gm")),
        ];
        const closingMatches = [
          ...documentText.matchAll(new RegExp(endTag, "gm")),
        ];

        let indices: any[] = [];
        openingMatches.forEach((match, index) => {
          if (match.index) {
            if (editor) {
              indices[index] = [editor.document.positionAt(match.index)];
            }
          }
        });
        closingMatches.forEach((match, index) => {
          if (match.index) {
            if (editor) {
              indices[index] = [
                ...indices[index],
                editor.document.positionAt(match.index + endTag.length),
              ];
            }
          }
        });

        // Compute the closest occurence
        const currentPos = editor.selection.active;
        const idx = indices.reduce(function (prev, curr) {
          return Math.abs(curr[0]._line - currentPos.line) <
            Math.abs(prev[1]._line - currentPos.line)
            ? curr
            : prev;
        });
        const element = (editor.selection = new vscode.Selection(
          idx[0],
          idx[1]
        ));
        deleteFromEditor(element);
        // }
        break;
      default:
        throw new InvalidCommandException(errorMsg);
    }
  }
};
