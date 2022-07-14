import * as vscode from "vscode";
import { getClosestMatchingWordPosEnd } from "./navigationUtility";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {

    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const closestWordPos = getClosestMatchingWordPosEnd(value);

        // Move cursor to the closestWord
        editor.selection = new vscode.Selection(closestWordPos, closestWordPos);

    } else {
        throw new InvalidCommandException('Error processing navigation command');
    }

 }
