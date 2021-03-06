import * as vscode from "vscode";
import {
    NavigationKeyword
  } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {
    switch (value) {
        case NavigationKeyword.terminal:
            vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
            break;
        default:
            throw new InvalidCommandException("Error processing navigation command");
    }
 }