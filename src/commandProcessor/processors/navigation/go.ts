import * as vscode from "vscode";
import {
    NavigationKeyword
  } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (direction:string) => {
    switch (direction) {
        case NavigationKeyword.up:
            vscode.commands.executeCommand("cursorMove", {to: 'up', by: 'line'});
            break;
        case NavigationKeyword.down:
            vscode.commands.executeCommand("cursorMove", {to: 'down', by: 'line'});
            break;
        case NavigationKeyword.left:
            vscode.commands.executeCommand("cursorMove", {to: 'left', by: 'character'});
            break;
        case NavigationKeyword.right:
            vscode.commands.executeCommand("cursorMove", {to: 'right', by: 'character'});
            break;
        default:
            throw new InvalidCommandException("Error processing navigation command");
    }
 }