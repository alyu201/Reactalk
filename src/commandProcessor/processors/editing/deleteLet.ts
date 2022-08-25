import { deleteFromEditor } from "../../utility";

export const execute = (elem: string) => {
  deleteFromEditor(`let ${elem}`); // throws InvalidCommandException when not found
};
