import * as vscode from "vscode";
import {
  SystemFileTypeKeywords,
  SystemFileTypes,
} from "../../../../definitions/commandPrefixes";

export const execute = async (sysCmdValue: string) => {
  console.log("sysCmdValue: " + sysCmdValue);

  const textEditor = vscode.window.activeTextEditor;

  if (textEditor != undefined) {
    var filepath = textEditor.document.uri.path;
    var dirPath = filepath.substring(0, filepath.lastIndexOf("/") + 1);

    switch (sysCmdValue) {
      case SystemFileTypeKeywords.javascript:
        createNewFileWithFileType(dirPath, SystemFileTypes.javascript);
        break;
      case SystemFileTypeKeywords.python:
        createNewFileWithFileType(dirPath, SystemFileTypes.python);
        break;
      case SystemFileTypeKeywords.html:
        createNewFileWithFileType(dirPath, SystemFileTypes.html);
        break;
      case SystemFileTypeKeywords.css:
        createNewFileWithFileType(dirPath, SystemFileTypes.css);
        break;
      case SystemFileTypeKeywords.typescript:
        createNewFileWithFileType(dirPath, SystemFileTypes.typescript);
        break;
      case SystemFileTypeKeywords.text:
        createNewFileWithFileType(dirPath, SystemFileTypes.text);
        break;
      case "":
        createNewFileWithFileType(dirPath, SystemFileTypes.text);
        break;
      default:
        let sysCmdValueUpdated = sysCmdValue.replace(/\s/g, "");
        createNewFileWithName(dirPath, sysCmdValueUpdated);
    }
  }
};

async function createNewFileWithFileType(
  dirPath: string,
  filetype: SystemFileTypes
) {
  const { TextEncoder } = require("util");

  const uri = vscode.Uri.file(dirPath + "/Untitled" + filetype);

  await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode("import React from 'react';"));
  vscode.window.showTextDocument(uri, { preview: false });
}

async function createNewFileWithName(dirPath: string, sysCmdValue: string) {
  const { TextEncoder } = require("util");

  const uri = vscode.Uri.file(dirPath + "/" + sysCmdValue);

  await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode("import React from 'react';"));
  vscode.window.showTextDocument(uri, { preview: false });
}
