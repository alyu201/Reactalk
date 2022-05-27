import { CompositionKeyword } from "./../../definitions/commandPrefixes";
import * as commands from "../../definitions/codeSnippets.json";
import * as vscode from "vscode";

interface Command {
  cmd: string;
  action: string;
}

export const processAdd = (inputCmd: string) => {
  const keyword = inputCmd.split(" ")[1];

  switch (keyword) {
    case CompositionKeyword.for:
      const action = commands.filter(({ cmd }: Command) => {
        return cmd.toLowerCase() === inputCmd;
      })[0].action;

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(action));
      }
  }
};
