import * as vscode from "vscode";
import * as inputCommands from "../definitions/commands.json";
import * as path from "path";
import { Status, STATUS } from "../definitions/status";

export class CommandProvider implements vscode.TreeDataProvider<InputCommand> {
  private _onDidChangeTreeData: vscode.EventEmitter<InputCommand | undefined | null | void> =
    new vscode.EventEmitter<InputCommand | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<InputCommand | undefined | null | void> =
    this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: InputCommand): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<InputCommand[]> {
    const cmds = inputCommands.map(
      ({ type, command }) =>
        new InputCommand(command, type, STATUS.NONE, vscode.TreeItemCollapsibleState.None)
    );
    const status = Status.getStatusInstance().getStatus();
    const children = [
      new InputCommand(`Status: ${status}`, "", status, vscode.TreeItemCollapsibleState.None),
      ...cmds,
    ];

    return Promise.resolve(children);
  }
}

class InputCommand extends vscode.TreeItem {
  constructor(
    public readonly cmd: string,
    private type: string,
    private status: STATUS,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(cmd, collapsibleState);
    this.tooltip = `${this.cmd}-${this.type}`;
    this.description = this.type;
  }

  iconPath = {
    light: path.join(__filename, "..", "..", "resources", `${this.status}.svg`),
    dark: path.join(__filename, "..", "..", "resources", `${this.status}.svg`),
  };
}
