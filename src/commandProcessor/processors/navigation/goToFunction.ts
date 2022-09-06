import * as vscode from "vscode";
import { getClosestMatchingWordPosEnd } from "./navigationUtility";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    console.log("go to function: " + value);
    const functionName = value.replace(" ", "");

    const prefix = `@${functionName}\r`;
    vscode.commands
      .executeCommand("workbench.action.quickOpen", prefix)
      .then(() => {
        vscode.commands.executeCommand(
          "workbench.action.acceptSelectedQuickOpenItem"
        );
      });
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
