import * as vscode from "vscode";

const copy = async (name: string) => {
  await vscode.commands.executeCommand("workbench.action.quickOpen", `@${name}\r`);
  await vscode.commands.executeCommand("tab");
  await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.commands.executeCommand("editor.action.selectToBracket");
  await vscode.commands.executeCommand("editor.action.smartSelect.expand");
  await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  await vscode.commands.executeCommand("cursorEnd");
  await vscode.window.showInformationMessage("Copied to clipboard!");
};

export const execute = (name: string) => {
  copy(name);
};
