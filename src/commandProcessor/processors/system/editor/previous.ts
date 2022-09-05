import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  vscode.commands.executeCommand("workbench.action.previousEditor");
};
