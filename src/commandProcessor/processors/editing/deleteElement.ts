import * as vscode from "vscode";
import { EditingValue } from "./../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";
import { searchEditor } from "../../utility";

export const execute = async (elem: string) => {
  const name = elem.split(" ")[0];
  if (Object.keys(EditingValue).includes(name)) {
    const num = elem.split(" ")[1];
    elem = `${EditingValue[name as keyof typeof EditingValue]}`.replace(
      new RegExp("\\$", "g"),
      name === "heading" ? num : ""
    );

    await searchEditor(elem); // throws InvalidCommandException when not found
    await vscode.commands.executeCommand("editor.emmet.action.removeTag");
  } else {
    throw new InvalidCommandException("Error processing editing command");
  }
};
