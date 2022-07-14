import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    // Assuming that the user has executed the 'go to function' command,
    // and the cursor is now at the start of the function name.

    const cursorPos = editor.selection.active;
    const start = editor.document.lineAt(cursorPos.line + 1).range.start;
    editor.selection = new vscode.Selection(start, start);
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
