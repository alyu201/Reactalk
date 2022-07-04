import * as vscode from "vscode";
import { getClosestMatchingWord } from "./navigationUtility";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {

    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const closestWord = getClosestMatchingWord(value);

        // Move cursor to the closestWord
        editor.selection = new vscode.Selection(closestWord, closestWord);

    } else {
        throw new InvalidCommandException('Error processing navigation command');
    }

 }
