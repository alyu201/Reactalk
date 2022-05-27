import {
  EditingKeyword,
  EditingPrefixes,
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
        // editor.revealRange(range);

        editor.edit((builder) => {
          builder.replace(selection, "");
        });
        break;
      default:
        throw new InvalidCommandException(errorMsg);
    }
  }
};
