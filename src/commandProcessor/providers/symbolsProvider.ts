import { symbolsList } from '../../definitions/symbols';
import * as vscode from "vscode";

export class SymbolsProvider implements vscode.TreeDataProvider<SymbolItem> {
  getTreeItem(element: SymbolItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<SymbolItem[]> {
    const symbolItems: SymbolItem[] = [];
    Object.keys(symbolsList).forEach(
      (key: string) => {
        const name = key as keyof typeof symbolsList;
        const result = name.replace(/([A-Z])/g, " $1");
        const nameString = result.charAt(0).toUpperCase() + result.slice(1);
        symbolItems.push(new SymbolItem(symbolsList[name], nameString, vscode.TreeItemCollapsibleState.None));
      }
    );
    const children = [...symbolItems];

    return Promise.resolve(children);
  }
}

class SymbolItem extends vscode.TreeItem {
  constructor(
    public readonly symbol: string,
    private name: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(symbol, collapsibleState);
    this.tooltip = `${this.symbol}-${this.name}`;
    this.description = this.name;
  }
}
