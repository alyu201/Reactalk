import { InvalidCommandException } from "../../invalidCommandException";
import { deleteFromEditor } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const remove = async (elem: string) => {
  deleteFromEditor(`const ${elem}`);
};

export const execute = (elem: string) => {
  remove(elem);

  // throwError();
};
