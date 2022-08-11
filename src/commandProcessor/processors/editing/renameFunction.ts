import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const rename = async (func: string) => {
  const name = camelize(func.split(" to ")[0]);
  const newName = camelize(func.split(" to ")[1]);

  await vscode.commands.executeCommand("workbench.action.quickOpen", `@${name}\r`);
  await vscode.commands.executeCommand("tab");
  await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
  await vscode.commands.executeCommand("cursorWordRightSelect");

  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.edit((builder) => {
      builder.replace(editor.selection, newName);
    });
  }

  await vscode.commands.executeCommand("cursorEnd");
};

export const execute = (func: string) => {
  rename(func);

  // throwError();
};
