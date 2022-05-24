import { EditingPrefixes } from "./../definitions/commandPrefixes";
import * as vscode from "vscode";

export const processEdit = (prefix: string, cmd: string) => {
  switch (prefix) {
    case EditingPrefixes.delete:
      const object = cmd.split(" ")[0];
      const name = cmd.split(" ")[1];
      deleteEdit(object, name);
  }
};

const deleteEdit = (object: string, name: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    switch (object) {
      case "line":
        let range = editor.document.lineAt(parseInt(name) - 1).range;
        let selection = (editor.selection = new vscode.Selection(
          range.start,
          range.end
        ));
        editor.revealRange(range);

        editor.edit((builder) => {
          builder.replace(selection, "");
        });
    }
  }
};
