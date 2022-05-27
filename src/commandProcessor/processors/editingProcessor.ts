import {
  EditingKeyword,
  EditingPrefixes,
} from "./../../definitions/commandPrefixes";
import * as vscode from "vscode";

export const processEdit = (prefix: string, cmd: string) => {
  switch (prefix) {
    case EditingPrefixes.delete:
      const keyword = cmd.split(" ")[0];
      const value = cmd.split(" ")[1];
      deleteEdit(keyword, value);
  }
};

const deleteEdit = (keyword: string, value: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    switch (keyword) {
      case EditingKeyword.line:
        let range = editor.document.lineAt(parseInt(value) - 1).range;
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
