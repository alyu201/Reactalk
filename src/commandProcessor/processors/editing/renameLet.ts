import * as vscode from "vscode";
import { camelize, searchEditor } from "../../utility";

export const execute = async (input: string) => {
  const name = camelize(input.split(" to ")[0]);
  const newName = camelize(input.split(" to ")[1]);

  await searchEditor(`let ${name}`); // throws InvalidCommandException when not found

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
