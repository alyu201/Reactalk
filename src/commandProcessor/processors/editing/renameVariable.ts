import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize, searchEditor } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const rename = async (elem: string) => {
  const name = elem.split(" to ")[0];
  const newName = camelize(elem.split(" to ")[1]);

  await searchEditor(`var ${name}`);

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

export const execute = (elem: string, prefix: string) => {
  rename(elem);

  // throwError();
};
