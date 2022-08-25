import { symbolsList } from "./../definitions/symbols";
import wordsToNumbers from "words-to-numbers";
import * as vscode from "vscode";
import { InvalidCommandException } from "./invalidCommandException";

// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
export function camelize(str: String) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function parseSymbols(code: string) {
  code = `${wordsToNumbers(code) ?? code}`;

  // Find all occurences of symbols as sentences and their start and end indicies
  const matchesList: { match: string; start: number; end: number }[] = [];
  Object.keys(symbolsList).map((sym) => {
    const matches = [...code.matchAll(new RegExp(sym.replace(/([A-Z])/g, " $1"), "gmi"))];
    if (matches !== undefined) {
      matches.map((match) => {
        matchesList.push({
          match: camelize(match[0]),
          start: match.index ?? 0,
          end: match.index ? match.index + match[0].length : 0,
        });
      });
    }
  });

  if (matchesList.length === 0) {
    return code;
  }

  // Variant of the non-overlapping interval algorithm implementation to remove duplicate symbols detected (https://medium.com/swlh/non-overlapping-intervals-f0bce2dfc617)
  matchesList.sort((a, b) => a.start - b.start);
  let j = 0;
  let k = 0;
  let indices = [];
  indices.push(matchesList[j]);

  for (let i = 1; i < matchesList.length; i++) {
    let nxtStartIdx = matchesList[i].start;
    let nxtEndIdx = matchesList[i].end;
    let currentEnd = matchesList[j].end;

    // Check for overlapping indices
    if (currentEnd > nxtStartIdx) {
      if (nxtEndIdx > currentEnd) {
        j = i;
      }
      // Replace current indices with the bigger index range
      indices[k] = matchesList[j];
    } else {
      j = i;

      // Append new indices to list
      indices.push(matchesList[j]);
      k++;
    }
  }

  // Replace all with actual symbols
  indices.map(({ match, start, end }) => {
    const index = Object.keys(symbolsList).indexOf(match);
    const symbol = Object.values(symbolsList)[index];

    code =
      code.substring(0, start) +
      symbol.padStart(end - start) +
      code.substring(end, code.length);
  });

  return code.replace(/\s+/g, " ").trim();
}

/**
 * @param phrase The string phrase to match with
 * @throws An InvalidCommandException when no results are found for the given
 */
export async function searchEditor(phrase: string) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const text = editor.document.getText();
    // Match with regex as well
    if (!text.match(phrase)) {
      await vscode.window.showInformationMessage(
        "Cannot find any matches. Try another command?"
      );
      throw new InvalidCommandException(`Unable to find search string: ${phrase}`);
    }
  }

  await vscode.commands.executeCommand("cursorHome");
  await vscode.commands.executeCommand("toggleSearchEditorRegex");
  await vscode.commands.executeCommand("editor.actions.findWithArgs", {
    isRegex: true,
    searchString: phrase,
  });
  await vscode.commands.executeCommand("editor.action.nextMatchFindAction");
  await vscode.commands.executeCommand("editor.action.previousMatchFindAction");
  await vscode.commands.executeCommand("closeFindWidget");
}

export async function deleteFromEditor(phrase: string) {
  searchEditor(phrase);
  await vscode.commands.executeCommand("editor.action.deleteLines");
}
