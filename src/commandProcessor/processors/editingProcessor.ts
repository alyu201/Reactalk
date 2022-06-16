import {
  EditingKeyword,
  EditingPrefixes,
  EditingValue,
} from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as vscode from "vscode";

const errorMsg = "Error processing editing command";

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
 * @param keyword The keyword used to determine the type of code to delete
 * @param value The value to identify the code to delete by
 * @throws An InvalidCommandException when an error occurs during processing
 */
const deleteEdit = (keyword: string, value: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    switch (keyword) {
      case EditingKeyword.line:
        const range = editor.document.lineAt(parseInt(value) - 1).range;
        const selection = (editor.selection = new vscode.Selection(
          range.start,
          range.end
        ));

        editor.edit((builder) => {
          builder.replace(selection, "");
        });
        break;
      case EditingKeyword.element:
        const documentText = editor.document.getText();
        const endTag = "</p>";
        // if (value in EditingValue) {
        const openingMatches = [
          ...documentText.matchAll(new RegExp("<p>", "gm")),
        ];
        const closingMatches = [
          ...documentText.matchAll(new RegExp(endTag, "gm")),
        ];
        console.log("openingIdx", openingMatches);
        console.log("closingIdx", closingMatches);
        const currentPos = editor.document.offsetAt(editor.selection.active);
        console.log(currentPos);
        let indices: any[] = [];
        openingMatches.forEach((match, index) => {
          if (match.index) {
            indices[index] = [match.index];
          }
        });
        closingMatches.forEach((match, index) => {
          if (match.index) {
            indices[index] = [...indices[index], match.index];
          }
        });
        console.log(indices);
        const idx = indices.reduce(function (prev, curr) {
          return Math.abs(curr[0] - currentPos) <
            Math.abs(prev[0] - currentPos) ||
            Math.abs(curr[1] - currentPos) < Math.abs(prev[1] - currentPos)
            ? curr
            : prev;
        });
        console.log(idx);
        const startPos = editor.document.positionAt(idx[0]);
        const endPos = editor.document.positionAt(idx[1] + endTag.length);
        console.log(startPos);
        console.log(endPos);
        editor.selection = new vscode.Selection(startPos, endPos);
        // }
        break;
      default:
        throw new InvalidCommandException(errorMsg);
    }
  }
};
