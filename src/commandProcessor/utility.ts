import { CompositionPrefixes, symbolsList } from "./../definitions/commandPrefixes";
// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
export function camelize(str: String) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function parseCommandSymbols(symbol: string) {
  if (camelize(symbol) in symbolsList) {
    const index = Object.keys(symbolsList).indexOf(camelize(symbol));
    return Object.values(symbolsList)[index];
  } else {
    throw new Error("Invalid symbol provided");
  }
}
