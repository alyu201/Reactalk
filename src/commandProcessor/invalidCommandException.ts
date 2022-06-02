/**
 * Exception thrown when an invalid command is given or no input command
 * can be mapped
 */
export class InvalidCommandException extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = "InvalidCommandException";
  }
}
