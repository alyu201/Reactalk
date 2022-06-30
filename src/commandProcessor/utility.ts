// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
export function camelize(str: String) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
<<<<<<< Updated upstream
=======

// TODO: add function here to parse commands with symbols and special characters
>>>>>>> Stashed changes
