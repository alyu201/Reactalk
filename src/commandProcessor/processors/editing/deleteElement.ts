import * as vscode from "vscode";
import { EditingValue } from "./../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const removeElement = async (elem: string) => {
  await vscode.commands.executeCommand("cursorHome");
  await vscode.commands.executeCommand("editor.actions.findWithArgs", {
    isRegex: true,
    searchString: elem,
  });
  await vscode.commands.executeCommand("editor.action.nextMatchFindAction");
  await vscode.commands.executeCommand("closeFindWidget");
  await vscode.commands.executeCommand("editor.emmet.action.removeTag");
};

export const execute = (elem: string) => {
  const name = elem.split(" ")[0];
  if (Object.keys(EditingValue).includes(name)) {
    const num = elem.split(" ")[1];
    elem = EditingValue[name as keyof typeof EditingValue].replace(
      "$",
      name === "heading" ? num : ""
    );

    removeElement(elem);
  } else {
    throwError();
  }
};
