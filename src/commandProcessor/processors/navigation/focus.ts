import * as vscode from "vscode";
import {
    NavigationValue
  } from "../../../definitions/commandPrefixes";
import { InvalidCommandException } from "../../invalidCommandException";

 export const execute = (value:string) => {
    switch (value) {
        case NavigationValue.terminal:
            vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
            break;
        default:
            throw new InvalidCommandException("Error processing navigation command");
    }
 }