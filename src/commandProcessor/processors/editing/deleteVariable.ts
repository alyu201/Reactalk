import { deleteFromEditor } from "../../utility";

export const execute = (elem: string) => {
  deleteFromEditor(`var ${elem}`); // throws InvalidCommandException when not found
};
