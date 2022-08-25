import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  vscode.commands.executeCommand("terminal.focus").then(function () {
    const terminal = vscode.window.activeTerminal;

    if (terminal != undefined) {
      terminal.sendText("npm start");
    }
  });
};
