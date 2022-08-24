import * as vscode from "vscode";
import { EditingValue, ElementTags } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";
import { searchEditor } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const rename = async (name: string, newName: string) => {
  const newPrefix = newName.split(" ")[0];

  // Find the element to rename by its "name"
  if (Object.keys(EditingValue).includes(newPrefix)) {
    await searchEditor(name); // throws InvalidCommandException when not found
    await vscode.commands.executeCommand("cursorLeft");
    await vscode.commands.executeCommand("cursorRight");
    await vscode.commands.executeCommand("cursorWordRightSelect");

    // Get the new HTML element tag to replace with
    const num = newName.split(" ")[1];
    const newElem = ElementTags[newPrefix as keyof typeof ElementTags].replace(
      "$",
      name === "heading" ? num : ""
    );

    await vscode.commands.executeCommand("editor.emmet.action.updateTag", newElem);
  } else {
    throwError();
  }
};

export const execute = (elem: string) => {
  const name = elem.split(" to ")[0].split(" ")[0];
  const newName = elem.split(" to ")[1];

  if (Object.keys(EditingValue).includes(name)) {
    const num = elem.split(" ")[1];
    elem = EditingValue[name as keyof typeof EditingValue].replace(
      "$",
      name === "heading" ? num : ""
    );

    rename(elem, newName);
  } else {
    throwError();
  }
};
