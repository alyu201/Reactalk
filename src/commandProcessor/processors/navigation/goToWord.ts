import * as vscode from "vscode";

import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {
    getClosestMatchingWord(value);
 }



 function getClosestMatchingWord(word:string){
    const editor = vscode.window.activeTextEditor;

    if (editor) {

        const documentText = editor.document.getText().toLowerCase();

        // Find indices of the matching word
        const allWordMatches = [...documentText.matchAll(new RegExp(word, 'gm'))];

        if (allWordMatches.length === 0) {
            vscode.window.showInformationMessage("Can't find word: " + word);
        } else {

            let indices: any[] = [];
            allWordMatches.forEach((match, indexInArray) => {
                // positionAt() returns a Position
                indices[indexInArray] = editor.document.positionAt(match.index || 0);
            });

            // Compute the closest occurence
            const cursorPos = editor.selection.active;
            const cursorOffset = editor.document.offsetAt(cursorPos);
            const closestWord = indices.reduce(function (prev, curr) {
                let prevOffset = editor.document.offsetAt(prev);
                let currOffset = editor.document.offsetAt(curr);
                return Math.abs(currOffset - cursorOffset) <
                Math.abs(prevOffset - cursorOffset)
                ? curr
                : prev;
            });

            // Move cursor to the closestWord
            editor.selection = new vscode.Selection(closestWord, closestWord);


        }


    } else {
        throw new InvalidCommandException('Error processing navigation command');
    }
 }