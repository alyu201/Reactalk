import * as vscode from "vscode";


 export const execute = (value:string) => {
    let editor = vscode.window.activeTextEditor;

    if (editor) {
        const end = editor.document.lineAt(parseInt(value) - 1).range.end;
        editor.selection = new vscode.Selection(end, end);
    }
 }