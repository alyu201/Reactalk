import { InvalidCommandException } from "./invalidCommandException";
import {
  CompositionPrefixes,
  EditingPrefixes,
  NavigationPrefixes,
  SystemPrefixes,
} from "./../definitions/commandPrefixes";
import * as commands from "../definitions/codeSnippets.json";
import { processEdit } from "./editingProcessor";

interface Command {
  cmd: string;
  action: string;
}

/**
 * @param input The input command to be processed.
 * @returns The action mapped to the input specified.
 * @throws An InvalidCommandException when an invalid command is found
 */
export const mapCommand = (input: string) => {
  const inputCmd = input.toLowerCase();
  const prefix = inputCmd.split(" ")[0];
  const cmd = inputCmd.split(" ").slice(1).join(" ");

  if (prefix in CompositionPrefixes) {
    const action = commands.filter(({ cmd }: Command) => {
      return cmd.toLowerCase() === inputCmd;
    })[0].action;

    console.log(action);
  } else if (prefix in EditingPrefixes) {
    processEdit(prefix, cmd);
  } else if (prefix in NavigationPrefixes) {
  } else if (prefix in SystemPrefixes) {
  } else {
    throw new InvalidCommandException("Invalid or no command input found");
  }
};
