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

      switch (cmd) {
        case NavigationKeyword.up:
          console.log("We want to go up")
          vscode.commands.executeCommand("cursorMove", {to: 'up', by: 'line'});
          break;
        case NavigationKeyword.down:
          console.log("We want to go down")
          vscode.commands.executeCommand("cursorMove", {to: 'down', by: 'line'});
          break;
        case NavigationKeyword.left:
          console.log("We want to go left")
          vscode.commands.executeCommand("cursorMove", {to: 'left', by: 'character'});
          break;
        case NavigationKeyword.right:
          console.log("We want to go right")
          vscode.commands.executeCommand("cursorMove", {to: 'right', by: 'character'});
          break;
        default:
          const keyword = cmd.split(" ").slice(1, -1).join(" ");
          const value = cmd.split(" ").slice(-1)[0];
          console.log("keyword: |" + keyword + "|")
          console.log("value: " + value)
          goToNavigation(keyword, value);
      }

      // We NEED this break or else it will go the the 'default'
      break;

    default:
      console.log("it threw the InvalidCommandException here")
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
