// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { processCommand } from "./commandProcessor/commandProcessor";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "reactalk" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "reactalk.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World!");
    }
  );

  const commandProcess = vscode.commands.registerCommand(
    "reactalk.commandProcess",
    () => {
      // processCommand("add for loop");
      // processCommand("delete line 1");
      // processCommand("go to start of line 1");
      // processCommand("go to end of line 2");
      // processCommand("undo");
      processCommand("redo");

      vscode.window.showInformationMessage("Processed");
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(commandProcess);
}

// this method is called when your extension is deactivated
export function deactivate() {}
