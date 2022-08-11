import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";
import { camelize, searchEditor } from "../../utility";

const throwError = () => {
  throw new InvalidCommandException("Error processing editing command");
};

const rename = async (input: string) => {
  const name = camelize(input.split(" to ")[0]);
  const newName = camelize(input.split(" to ")[1]);

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

export const execute = (name: string) => {
  rename(name);

  // throwError();
};
