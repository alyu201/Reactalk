import * as vscode from "vscode";
import { getClosestMatchingWordPosEnd } from "./navigationUtility";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {

    const editor = vscode.window.activeTextEditor;

    if (editor) {
        
        console.log("go to function: " + value);

    } else {
        throw new InvalidCommandException('Error processing navigation command');
    }

 }
