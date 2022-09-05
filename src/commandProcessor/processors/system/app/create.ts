import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);
  const terminal = vscode.window.activeTerminal;

  if (terminal != undefined) {
    terminal.sendText(
      `npx create-react-app@latest ${sysCmdValue}\rcd ${sysCmdValue}`
    );

    vscode.window.showInformationMessage(
      "Terminal creating app now... After that you will be in the app folder."
    );
  }
};
