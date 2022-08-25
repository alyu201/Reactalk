import { STATUS } from "../../../../definitions/status";
import * as vscode from "vscode";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue == "") {
    console.log("ReactalkStatus: " + ReactalkStatus);
    ReactalkStatus = STATUS.PAUSE;
  }
};
