// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { startListening } from './inputProcessor/speechRecognition';
import { processCommand } from './commandProcessor/commandProcessor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "reactalk" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('reactalk.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from Megan!');
  });

  let disposable2 = vscode.commands.registerCommand('reactalk.start', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('You can start to talk');
    //startListening();
  });

  // registerCommand() will return a Disposable.
  // A Disposable type can release resources (like event listening or a timer).
  // When this disposable is disposed, it'll make the associated command become unregistered.
  let disposableStartLis = vscode.commands.registerCommand(
    'reactalk.startListening',
    startListening
  );

  // TODO: remove this command after completion - for testing purposes only
  let commandProcess = vscode.commands.registerCommand('reactalk.commandProcess', () => {
    processCommand('delete element container');

    vscode.window.showInformationMessage('Processed');
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposableStartLis);
  context.subscriptions.push(commandProcess);
}

// this method is called when your extension is deactivated
export function deactivate() {}
