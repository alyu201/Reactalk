import { InvalidCommandException } from "./../invalidCommandException";

/**
 * @param prefix The prefix of the navigation command to process
 * @param cmd The transcribed navigation command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processNavigation = (prefix: string, value: string) => {
  console.log("prefix: " + prefix);
  console.log("value: " + value);

  try {
    const navMod = require(`./navigation/${prefix}`);
    navMod.execute(value);
  } catch (error) {
    throw new InvalidCommandException("Error processing navigation command");
  }
};
