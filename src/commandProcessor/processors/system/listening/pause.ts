import { Status, STATUS } from "../../../../definitions/status";
import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue === "") {
    Status.getStatusInstance().updateStatus(STATUS.PAUSE);
    vscode.commands.executeCommand("reactalk.refreshStatus");
  }
};
