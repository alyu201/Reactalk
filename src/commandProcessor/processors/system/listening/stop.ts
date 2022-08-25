import { STATUS } from "../../../../definitions/status";

export const execute = (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  if (sysCmdValue == "") {
    console.log("ReactalkStatus: " + ReactalkStatus);
    ReactalkStatus = STATUS.STOP;
  }
};
