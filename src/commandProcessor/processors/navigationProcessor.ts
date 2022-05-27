import {
  NavigationKeyword,
  NavigationPrefixes,
} from "./../../definitions/commandPrefixes";
import * as vscode from "vscode";

export const processNavigation = (prefix: string, cmd: string) => {
  switch (prefix) {
    case NavigationPrefixes.go:
      const keyword = cmd.split(" ").slice(1, -1).join(" ");
      const value = cmd.split(" ").slice(-1)[0];

      goToNavigation(keyword, value);
  }
};

const goToNavigation = (object: string, value: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    switch (object) {
      case NavigationKeyword.startOfLine:
        let range = editor.document.lineAt(parseInt(value) - 1).range;
        const newSelection = new vscode.Selection(range.start, range.start);
        editor.selection = newSelection;
    }
  }
};
