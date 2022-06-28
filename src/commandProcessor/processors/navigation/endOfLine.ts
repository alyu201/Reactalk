import * as vscode from "vscode";


 export const execute = (value:string) => {
    let editor = vscode.window.activeTextEditor;

    if (editor) {
        console.log("endOfLine value: " + value);

        const end = editor.document.lineAt(parseInt(value) - 1).range.end;
        editor.selection = new vscode.Selection(end, end);
    }
 }