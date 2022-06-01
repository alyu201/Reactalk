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

/**
 * @param input The transcribed input command to be processed.
 * @throws An InvalidCommandException when an invalid command is found
 */
export const processCommand = (input: string) => {
  const inputCmd = input.toLowerCase();
  const prefix = inputCmd.split(" ")[0];
  const cmd = inputCmd.split(" ").slice(1).join(" ");

  if (prefix in CompositionPrefixes) {
    processAdd(inputCmd);
  } else if (prefix in EditingPrefixes) {
    processEdit(prefix, cmd);
  } else if (prefix in NavigationPrefixes) {
    processNavigation(prefix, cmd);
  } else if (prefix in SystemPrefixes) {
    processSystem(prefix, cmd);
  } else {
    throw new InvalidCommandException("Invalid or no command input found");
  }
};
