import { InvalidCommandException } from "./invalidCommandException";
import {
  CompositionPrefixes,
  EditingPrefixes,
  NavigationPrefixes,
  SystemPrefixes,
  NavigationKeyword,
} from "../definitions/commandPrefixes";
import { processEdit } from "./processors/editingProcessor";
import { processAdd } from "./processors/compositionProcessor";
import { processNavigation } from "./processors/navigationProcessor";
import { processSystem } from "./processors/systemProcessor";
import { camelize } from "./utility";
import wordsToNumbers from "words-to-numbers";

/**
 * @param input The transcribed input command to be processed.
 * @throws An InvalidCommandException when an invalid command is found
 */

export const processCommand = (input: string) => {
  // TODO: refactor to parse transcription here instead of in individual processors
  const inputCmd = `${wordsToNumbers(input) ?? input}`.toLowerCase();
  const inputCmdArray = inputCmd.split(" ");

  const prefix = inputCmdArray[0];
  const cmd = inputCmdArray.slice(1).join(" ");

  /***** This is for the System commands only ******/
  var sysCmdCategory = "";
  var sysCmdValue = "";

  // If the command only contains more than 1 word, the 2nd word is the category.
  if (inputCmdArray.length > 1) {
    sysCmdCategory = inputCmdArray[1];
  }

  // If the command contains more than 2 words, the rest of the command is the value

  if (inputCmdArray.length > 2) {
    const prefixNotCamel = inputCmd.split(" ").splice(0, 2).join(" ");
    sysCmdValue = inputCmd
      .substring(prefixNotCamel.length, inputCmd.length)
      .trim();
  }

  /***********/

  if (prefix in CompositionPrefixes) {
    console.log("This is a compostion command");
    processAdd(inputCmd);
  } else if (prefix in EditingPrefixes) {
    console.log("This is a editing command");
    const prefixNotCamel = inputCmd.split(" ").splice(0, 2).join(" ");
    const prefixCamel = camelize(prefixNotCamel);
    const value = inputCmd
      .substring(prefixNotCamel.length, inputCmd.length)
      .trim();
    processEdit(prefixCamel, value);
  } else if (prefix in NavigationPrefixes) {
    console.log("This is a navigation command");

    const secondWordIdx = 1;
    const beyondSecondWordIdx = 2;
    const thirdWordIdx = 2;
    const beyondThirdWordIdx = 3;
    const fifthWordIdx = 4;
    const beyondFifthWordIdx = 5;

    // This is for the 'enter' command
    if (inputCmdArray.length === 1) {
      processNavigation(prefix, "");
    }

    try {
      if (inputCmdArray[secondWordIdx] in NavigationKeyword) {
        // Yes, this is meant to be splice(secondWordIdx)
        //const remaining = inputCmdArray.splice(secondWordIdx)[0];
        const prefixNotCamel = inputCmdArray
          .slice(0, beyondSecondWordIdx)
          .join(" ");
        const prefixCamel = camelize(prefixNotCamel);
        const remaining = inputCmdArray.slice(beyondSecondWordIdx).join(" ");
        processNavigation(prefixCamel, remaining);
      } else if (inputCmdArray[thirdWordIdx] in NavigationKeyword) {
        const prefixNotCamel = inputCmdArray
          .slice(0, beyondThirdWordIdx)
          .join(" ");
        const prefixCamel = camelize(prefixNotCamel);
        const remaining = inputCmdArray.slice(beyondThirdWordIdx).join(" ");
        processNavigation(prefixCamel, remaining);
      } else if (inputCmdArray[fifthWordIdx] in NavigationKeyword) {
        const prefixNotCamel = inputCmdArray
          .slice(0, beyondFifthWordIdx)
          .join(" ");
        const prefixCamel = camelize(prefixNotCamel);
        const remaining = inputCmdArray.slice(beyondFifthWordIdx).join(" ");
        processNavigation(prefixCamel, remaining);
      } else {
        throw new InvalidCommandException("Invalid or no command input found");
      }
    } catch (error) {
      throw new InvalidCommandException("Invalid or no command input found");
    }
  } else if (prefix in SystemPrefixes) {
    console.log("This is a system command");
    processSystem(prefix, sysCmdCategory, sysCmdValue);
  } else {
    console.log("This command got error");
    throw new InvalidCommandException("Invalid or no command input found");
  }
};
