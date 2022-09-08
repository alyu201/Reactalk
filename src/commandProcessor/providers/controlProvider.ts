import * as vscode from "vscode";
import * as path from "path";
import { Status, STATUS } from "../../definitions/status";

export class ControlProvider implements vscode.TreeDataProvider<ControlItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ControlItem | undefined | null | void> =
        new vscode.EventEmitter<ControlItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<ControlItem | undefined | null | void> =
        this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ControlItem): vscode.TreeItem {
        return element;
    }

    getChildren(): Thenable<ControlItem[]> {
        const clientStatus = Status.getStatusInstance();
        const status = clientStatus.getStatus();
        const children = [
            new ControlItem(`Status: ${status}`, "", status, vscode.TreeItemCollapsibleState.None),
            new ControlItem(
                `Command: ${clientStatus.getCommand()}`,
                "",
                STATUS.NONE,
                vscode.TreeItemCollapsibleState.None
            ),
            new ControlItem("", "", STATUS.NONE, vscode.TreeItemCollapsibleState.None),
        ];

        return Promise.resolve(children);
    }
}

class ControlItem extends vscode.TreeItem {
    constructor(
        public readonly title: string,
        private desc: string,
        private status: STATUS,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(title, collapsibleState);
        this.tooltip = `${this.title}-${this.desc}`;
        this.description = this.desc;
    }

    iconPath = {
        light: path.join(__filename, "..", "..", "resources", `${this.status}.svg`),
        dark: path.join(__filename, "..", "..", "resources", `${this.status}.svg`),
    };
}
