import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const removeFuntion = async (func: string) => {
  await vscode.commands.executeCommand("workbench.action.quickOpen", `@${func}\r`);
  await vscode.commands.executeCommand("tab");
  await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.commands.executeCommand("editor.action.selectToBracket");
  await vscode.commands.executeCommand("editor.action.smartSelect.expand");
  await vscode.commands.executeCommand("deleteLeft");
};

export const execute = (func: string) => {
  removeFuntion(camelize(func));
};
