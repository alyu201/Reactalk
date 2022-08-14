import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);
  const terminal = vscode.window.activeTerminal;

  if (terminal != undefined) {
    terminal.sendText("npm start");
  }
};
