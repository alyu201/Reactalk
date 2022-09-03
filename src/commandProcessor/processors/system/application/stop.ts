import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  vscode.commands.executeCommand("terminal.focus").then(function () {
    sendCtrlC();
  });
};

async function sendCtrlC() {
  await vscode.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    { text: "\x03" }
  );
}
