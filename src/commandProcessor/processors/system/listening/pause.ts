import { STATUS } from "../../../../definitions/status";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue == "") {
    ReactalkStatus = STATUS.PAUSE;
  }
};
