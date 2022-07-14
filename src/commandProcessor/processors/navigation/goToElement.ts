import * as vscode from "vscode";
import { getClosestMatchingWordPosStart } from "./navigationUtility";
import { InvalidCommandException } from "../../invalidCommandException";

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const elementName = value.replace(" ", "");
    const elementToFind = `<${elementName}`; // Note: I purposely left out the '>'

    // Calculate the closest element
    const closestElement = getClosestMatchingWordPosStart(elementToFind);

    // Calculate the cursor position move to between the '<' and the element name
    const posToMoveCursor = closestElement.translate({
      characterDelta: 1,
      lineDelta: 0,
    });

    // Move the cursor
    editor.selection = new vscode.Selection(posToMoveCursor, posToMoveCursor);
  } else {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
