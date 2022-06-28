import {
  NavigationKeyword,
  NavigationPrefixes,
} from "./../../definitions/commandPrefixes";
import { InvalidCommandException } from "../invalidCommandException";
import * as vscode from "vscode";
const errorMsg = "Error processing navigation command";

/**
 * @param prefix The prefix of the navigation command to process
 * @param cmd The transcribed navigation command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processNavigation = (prefix: string, value: string) => {

  console.log("prefix: " + prefix + "|");
  console.log("value: " + value);

  const navMod = require(`./navigation/${prefix}`);
  let val = navMod.execute(value);

  // switch (prefix) {
  //   case NavigationPrefixes.go:

  //     // switch (cmd) {
  //     //   case NavigationKeyword.up:
  //     //     vscode.commands.executeCommand("cursorMove", {to: 'up', by: 'line'});
  //     //     break;
  //     //   case NavigationKeyword.down:
  //     //     vscode.commands.executeCommand("cursorMove", {to: 'down', by: 'line'});
  //     //     break;
  //     //   case NavigationKeyword.left:
  //     //     vscode.commands.executeCommand("cursorMove", {to: 'left', by: 'character'});
  //     //     break;
  //     //   case NavigationKeyword.right:
  //     //     vscode.commands.executeCommand("cursorMove", {to: 'right', by: 'character'});
  //     //     break;
  //     //   default:
  //     //     const keyword = cmd.split(" ").slice(1, -1).join(" ");
  //     //     const value = cmd.split(" ").slice(-1)[0];
  //     //     goToNavigation(keyword, value);

  //     // }

  //     // We NEED this break or else it will go the the 'default'
  //     break;
    
  //   case NavigationPrefixes.goTo:
  //     const keyword = cmd.split(" ").slice(1, -1).join(" ");
  //     const value = cmd.split(" ").slice(-1)[0];
  //     goToNavigation(keyword, value);
  //     break;

  //   default:
  //     throw new InvalidCommandException(errorMsg);
  // }
};

/**
 * @param keyword The keyword used to determine the type of navigation
 * @param value The value to execute the navigation with
 * @throws An InvalidCommandException when an error occurs during processing
 */
const goToNavigation = (keyword: string, value: string) => {
  // keyword = "start of line"
  const keywordCamelize = camelize(keyword);
  console.log("keywordCamelize: " + keywordCamelize);

  const navMod = require(`./navigation/${keywordCamelize}`);
  let val = navMod.execute(value);
};


function camelize(str:String) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}