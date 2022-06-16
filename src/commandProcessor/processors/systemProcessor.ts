import { SystemPrefixes } from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "./../invalidCommandException";
import * as vscode from "vscode";

const errorMsg = "Error processing system command";

/**
 * @param prefix The prefix of the system command to process
 * @param cmd The transcribed system command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processSystem = (prefix: string, cmd?: string) => {
  switch (prefix) {
    case SystemPrefixes.undo:
      undo();
      break;
    case SystemPrefixes.redo:
      redo();
      break;
    case SystemPrefixes.save:
      saveCurrentFile();
      break;
    default:
      throw new InvalidCommandException(errorMsg);
  }
};

const undo = () => {
  vscode.commands.executeCommand("undo");
};

const redo = () => {
  vscode.commands.executeCommand("redo");
};

const saveCurrentFile = () => {
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const saveFilePromise = document.save();

    saveFilePromise.then(
      () => console.log("file saved"), 
      () => {
        console.log("file NOT saved")
        vscode.window.showErrorMessage("There's a problem saving the file. Try again... ");
    });
  }
  
}
