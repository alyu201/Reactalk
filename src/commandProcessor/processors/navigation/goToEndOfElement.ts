import * as vscode from "vscode";
import { getClosestMatchingWordPosStart } from "./navigationUtility";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const elementName = value.replace(" ", "");
    const elementToFind = `</${elementName}`; // Note: I purposely left out the '>'

    // Calculate the closest element
    const closestElement = getClosestMatchingWordPosStart(elementToFind);

    // Move the cursor to the element before the '<'
    editor.selection = new vscode.Selection(closestElement, closestElement);
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
