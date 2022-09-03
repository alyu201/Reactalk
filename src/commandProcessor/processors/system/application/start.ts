import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  vscode.commands.executeCommand("terminal.focus").then(function () {
    const terminal = vscode.window.activeTerminal;

    if (terminal != undefined) {
      terminal.sendText("BROWSER=none npm start");

      vscode.window.showInformationMessage("Browser will open in 5 seconds.");

      setTimeout(function () {
        // Open the simple browser in vscode
        vscode.commands.executeCommand(
          "simpleBrowser.show",
          "http://localhost:3000"
        );
      }, 5000);
    }
  });
};
