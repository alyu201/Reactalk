// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as commands from "./actions.json";

interface Action {
  input: String;
  snippet: String;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "reactalk" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const commandProcess = vscode.commands.registerCommand(
    "reactalk.commandProcess",
    () => {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const command = commands.composition.filter((cmd: Action) => {
          return cmd.input === "Add for loop";
        });

        const snippet = command[0].snippet;
        console.log(snippet);
        editor.insertSnippet(new vscode.SnippetString(snippet));
      }

      vscode.window.showInformationMessage("Processed");
    }
  );

  context.subscriptions.push(commandProcess);
}

// this method is called when your extension is deactivated
export function deactivate() {}
