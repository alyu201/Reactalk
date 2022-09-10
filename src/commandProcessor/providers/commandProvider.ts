import * as vscode from "vscode";
import * as inputCommands from "../../definitions/commands.json";

export class CommandProvider implements vscode.TreeDataProvider<InputCommand> {
  getTreeItem(element: InputCommand): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<InputCommand[]> {
    const children = inputCommands.map(
      ({ type, command }) =>
        new InputCommand(command, type, vscode.TreeItemCollapsibleState.None)
    );
    return Promise.resolve(children);
  }
}

class InputCommand extends vscode.TreeItem {
  constructor(
    public readonly cmd: string,
    private type: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(cmd, collapsibleState);
    this.tooltip = `${this.cmd}-${this.type}`;
    this.description = this.type;
  }
}
