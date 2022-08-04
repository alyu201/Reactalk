import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const rename = async (elem: string) => {
  const name = elem.split(" to ")[0];
  const newName = camelize(elem.split(" to ")[1]);

  await vscode.commands.executeCommand("cursorHome");
  await vscode.commands.executeCommand("editor.actions.findWithArgs", {
    isRegex: false,
    searchString: `const ${name}`,
  });
  await vscode.commands.executeCommand("editor.action.nextMatchFindAction");
  await vscode.commands.executeCommand("closeFindWidget");
  await vscode.commands.executeCommand("cursorRight");
  await vscode.commands.executeCommand("cursorWordLeftSelect");

  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.edit((builder) => {
      builder.replace(editor.selection, newName);
    });
  }

  await vscode.commands.executeCommand("cursorEnd");
};

export const execute = (elem: string) => {
  rename(elem);

  // throwError();
};
