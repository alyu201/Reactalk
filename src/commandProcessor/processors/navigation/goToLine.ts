import * as vscode from "vscode";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {

    const editor = vscode.window.activeTextEditor;

    if (editor) {
        // Calculate the target line number
        const targetLineNum = parseInt(value) - 1;

        // Get the current line number of the cursor
        const cursorPos = editor.selection.active;
        const cursorLineNum = cursorPos.line;

        if (targetLineNum < cursorLineNum) {
            // If targetLineNum is ABOVE cursorLineNum, it means we need to move up
            const howMuchToMoveUp = cursorLineNum - targetLineNum;
            vscode.commands.executeCommand("cursorMove", {to: 'up', by: 'line', value: howMuchToMoveUp});
        } else {
            // If targetLineNum is UNDER cursorLineNum, it means we need to move down
            const howMuchToMoveDown = targetLineNum - cursorLineNum;
            vscode.commands.executeCommand("cursorMove", {to: 'down', by: 'line', value: howMuchToMoveDown});
        }

        
    } else {
        throw new InvalidCommandException('Error processing navigation command');
    }

 }