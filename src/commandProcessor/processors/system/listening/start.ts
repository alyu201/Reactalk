import { STATUS } from "../../../../definitions/status";
import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue == "") {
    ReactalkStatus = STATUS.LISTEN;
  }
};
