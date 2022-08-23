import * as vscode from "vscode";
import { camelize, searchEditor } from "../../utility";

export const execute = async (elem: string) => {
  const name = elem.split(" to ")[0];
  const newName = camelize(elem.split(" to ")[1]);

  await searchEditor(`const ${name}`); // throws InvalidCommandException when not found

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
