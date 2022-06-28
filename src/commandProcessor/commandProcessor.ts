import { InvalidCommandException } from "./invalidCommandException";
import {
  CompositionPrefixes,
  EditingPrefixes,
  NavigationPrefixes,
  SystemPrefixes,
} from "../definitions/commandPrefixes";
import { processEdit } from "./processors/editingProcessor";
import { processAdd } from "./processors/compositionProcessor";
import { processNavigation } from "./processors/navigationProcessor";
import { processSystem } from "./processors/systemProcessor";
import { camelize } from "./utility";

/**
 * @param input The transcribed input command to be processed.
 * @throws An InvalidCommandException when an invalid command is found
 */
export const processCommand = (input: string) => {
  const inputCmd = input.toLowerCase();
  const prefix = inputCmd.split(" ")[0];
  const cmd = inputCmd.split(" ").slice(1).join(" ");

  if (prefix in CompositionPrefixes) {
    console.log("This is a compostion command");
    processAdd(inputCmd);
  } else if (prefix in EditingPrefixes) {
    console.log("This is a editing command");
    processEdit(prefix, cmd);
  } else if (prefix in NavigationPrefixes) {

    console.log("This is a navigation command");
    const value = inputCmd.split(" ").splice(-1)[0];
    const prefixNotCamel = inputCmd.substring(0, inputCmd.length - value.length);
    const prefixCamel = camelize(prefixNotCamel);
    processNavigation(prefixCamel, value);

  } else if (prefix in SystemPrefixes) {
    console.log("This is a system command");
    processSystem(prefix, cmd);
  } else {
    console.log("This command got error");
    throw new InvalidCommandException("Invalid or no command input found");
  }
};

