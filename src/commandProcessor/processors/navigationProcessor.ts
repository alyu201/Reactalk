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
      console.log("keyword", keyword);
      console.log("value", value);

      goToNavigation(keyword, value);
  }
};

const goToNavigation = (object: string, value: string) => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    switch (object) {
      case NavigationKeyword.startOfLine:
        const start = editor.document.lineAt(parseInt(value) - 1).range.start;
        editor.selection = new vscode.Selection(start, start);
      case NavigationKeyword.endOfLine:
        const end = editor.document.lineAt(parseInt(value) - 1).range.end;
        editor.selection = new vscode.Selection(end, end);
    }
  }
};
