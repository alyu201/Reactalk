import * as vscode from 'vscode';
import { EditingValue } from './../../../definitions/commandPrefixes';
import { InvalidCommandException } from '../../invalidCommandException';

const throwError = () => {
  throw new InvalidCommandException('Error processing editing command');
};

export const execute = (value: string) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    if (Object.keys(EditingValue).includes(value)) {
      const documentText = editor.document.getText();
      const elementTag = EditingValue[value as keyof typeof EditingValue];
      const startTag = elementTag.split(' ')[0];
      const endTag = elementTag.split(' ')[1];

      // Find indices of all occurences of the specified element
      const openingMatches = [...documentText.matchAll(new RegExp(startTag, 'gm'))];
      const closingMatches = [...documentText.matchAll(new RegExp(endTag, 'gm'))];

      if (openingMatches.length === 0 || closingMatches.length === 0) {
        throwError();
      }

      let indices: any[] = [];
      openingMatches.forEach((match, index) => {
        if (editor) {
          indices[index] = [editor.document.positionAt(match.index || 0)];
        }
      });
      closingMatches.forEach((match, index) => {
        if (editor) {
          indices[index] = [
            ...indices[index],
            editor.document.positionAt((match.index || 0) + match[0].length),
          ];
        }
      });

      // Compute the closest occurence
      const currentPos = editor.selection.active;
      const idx = indices.reduce(function (prev, curr) {
        return Math.abs(curr[0]._line - currentPos.line) <
          Math.abs(prev[1]._line - currentPos.line)
          ? curr
          : prev;
      });
      const element = (editor.selection = new vscode.Selection(idx[0], idx[1]));

      editor.edit((builder) => {
        builder.replace(element, '');
      });
    } else {
      throwError();
    }
  }
};
