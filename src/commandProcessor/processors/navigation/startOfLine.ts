import * as vscode from "vscode";


 export const execute = (value:string) => {
    let editor = vscode.window.activeTextEditor;

    if (editor) {
        console.log("startOfLine value: " + value);

        const start = editor.document.lineAt(parseInt(value) - 1).range.start;
        editor.selection = new vscode.Selection(start, start);
    }
 }