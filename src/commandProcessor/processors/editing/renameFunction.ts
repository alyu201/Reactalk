import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize } from "../../utility";

export const execute = async (func: string) => {
  const name = camelize(func.split(" to ")[0]);
  const newName = camelize(func.split(" to ")[1]);

  await vscode.commands.executeCommand("workbench.action.quickOpen", `@${name}\r`);
  await vscode.commands.executeCommand("tab");
  await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
  await vscode.commands.executeCommand("cursorWordRightSelect");

  // Check if selection is empty
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    if (selection && selection.isEmpty) {
      // No results found
      await vscode.commands.executeCommand("workbench.action.closeQuickOpen");
      await vscode.commands.executeCommand("cursorRight");
      await vscode.commands.executeCommand("deleteLeft");

      await vscode.window.showInformationMessage(
        "Cannot find any matches. Try another command?"
      );
      throw new InvalidCommandException(`Unable to find function: ${name}`);
    }

    editor.edit((builder) => {
      builder.replace(editor.selection, newName);
    });
  }

  await vscode.commands.executeCommand("cursorEnd");
};
