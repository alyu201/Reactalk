import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const remove = async (elem: string) => {
  await vscode.commands.executeCommand("cursorHome");
  await vscode.commands.executeCommand("editor.actions.findWithArgs", {
    isRegex: false,
    searchString: `let ${elem}`,
  });
  await vscode.commands.executeCommand("editor.action.nextMatchFindAction");
  await vscode.commands.executeCommand("closeFindWidget");
  await vscode.commands.executeCommand("editor.action.deleteLines");
};

export const execute = (elem: string) => {
  remove(elem);

  // throwError();
};
