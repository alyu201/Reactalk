import * as vscode from "vscode";

export enum STATUS {
  LISTEN = "started",
  STOP = "stopped",
  PAUSE = "paused",
  NONE = "none",
}

export class Status {
  private static instance: Status;
  private status: STATUS;

  constructor() {
    this.status = STATUS.STOP;
  }

  public static getStatusInstance(): Status {
    if (!Status.instance) {
      Status.instance = new Status();
    }

    return Status.instance;
  }

  public getStatus() {
    return this.status;
  }

  public async updateStatus(newStatus: STATUS) {
    this.status = newStatus;
    await vscode.commands.executeCommand("reactalk.refreshStatus");
    return this.status;
  }
}
