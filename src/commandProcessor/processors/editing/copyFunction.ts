import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize } from "../../utility";

const copy = async (name: string) => {
  await vscode.commands.executeCommand("workbench.action.quickOpen", `@${name}\r`);
  await vscode.commands.executeCommand("tab");
  await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.commands.executeCommand("editor.action.selectToBracket");
  await vscode.commands.executeCommand("editor.action.smartSelect.expand");

  // Check if selection is empty
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    if (selection && !selection.isEmpty) {
      const selectionRange = new vscode.Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character
      );
      const highlighted = editor.document.getText(selectionRange);
      if (highlighted.trim().length === 0) {
        // No results found
        await vscode.commands.executeCommand("workbench.action.closeQuickOpen");
        await vscode.commands.executeCommand("cursorRight");
        await vscode.commands.executeCommand("deleteLeft");

        await vscode.window.showInformationMessage(
          "Cannot find any matches. Try another command?"
        );
        throw new InvalidCommandException(`Unable to find function: ${name}`);
      }
    }
  }

  await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.window.showInformationMessage("Copied to clipboard!");
};

export const execute = (name: string) => {
  copy(camelize(name));
};
