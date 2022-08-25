import { deleteFromEditor } from "../../utility";

export const execute = (elem: string) => {
  deleteFromEditor(`const ${elem}`); // throws InvalidCommandException when not found
};
