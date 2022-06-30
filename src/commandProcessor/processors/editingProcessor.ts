import { InvalidCommandException } from '../invalidCommandException';

/**
 * @param prefix The prefix of the editing command to process
 * @param value The transcribed editing command without the prefix to process
 * @throws An InvalidCommandException when an error occurs during processing
 */
export const processEdit = (prefix: string, value: string) => {
  console.log('prefix: ' + prefix);
  console.log('value: ' + value);

  try {
    const editMod = require(`./editing/${prefix}`);
    editMod.execute(value);
  } catch (error) {
    throw new InvalidCommandException('Error processing editing command');
  }
};
