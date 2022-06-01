import {
  NavigationKeyword,
  NavigationPrefixes,
} from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as vscode from "vscode";

const errorMsg = "Error processing navigation command";

/**
 * @param prefix The prefix of the navigation command to process
 * @param cmd The transcribed navigation command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processNavigation = (prefix: string, cmd: string) => {
  switch (prefix) {
    case NavigationPrefixes.go:
      const keyword = cmd.split(" ").slice(1, -1).join(" ");
      const value = cmd.split(" ").slice(-1)[0];
      goToNavigation(keyword, value);
      break;
    default:
      throw new InvalidCommandException(errorMsg);
  }
};

/**
 * @param keyword The keyword used to determine the type of navigation
 * @param value The value to execute the navigation with
 * @throws An InvalidCommandException when an error occurs during processing
 */
const goToNavigation = (keyword: string, value: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    switch (keyword) {
      case NavigationKeyword.startOfLine:
        const start = editor.document.lineAt(parseInt(value) - 1).range.start;
        editor.selection = new vscode.Selection(start, start);
        break;
      case NavigationKeyword.endOfLine:
        const end = editor.document.lineAt(parseInt(value) - 1).range.end;
        editor.selection = new vscode.Selection(end, end);
        break;
      default:
        throw new InvalidCommandException(errorMsg);
    }
  }
};
