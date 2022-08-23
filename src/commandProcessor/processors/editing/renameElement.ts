import * as vscode from "vscode";
import { EditingValue, ElementTags } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const rename = async (name: string, newName: string) => {
  const prefix = newName.split(" ")[0];

  // Find the element to rename by its "name"
  if (Object.keys(EditingValue).includes(prefix)) {
    await vscode.commands.executeCommand("cursorHome");
    await vscode.commands.executeCommand("editor.actions.findWithArgs", {
      isRegex: true,
      searchString: name.split("|")[0],
    });
    // Jump to the closest, first match
    await vscode.commands.executeCommand("editor.action.nextMatchFindAction");
    await vscode.commands.executeCommand("editor.action.previousMatchFindAction");

    await vscode.commands.executeCommand("closeFindWidget");
    await vscode.commands.executeCommand("cursorLeft");
    await vscode.commands.executeCommand("cursorRight");
    await vscode.commands.executeCommand("cursorWordRightSelect");

    // Get the new HTML element tag to replace with
    const num = newName.split(" ")[1];
    const newElem = ElementTags[prefix as keyof typeof ElementTags].replace(
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
