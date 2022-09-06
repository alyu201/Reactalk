import * as vscode from "vscode";

export const execute = (value: string) => {
  vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
};
