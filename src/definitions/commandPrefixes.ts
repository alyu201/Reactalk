export enum CompositionPrefixes {
  add = "add",
}

export enum EditingPrefixes {
  rename = "rename",
  delete = "delete",
  copy = "copy",
  paste = "paste",
}

export enum NavigationPrefixes {
  go = "go",
  focus = "focus",
}

export enum SystemPrefixes {
  save = "save",
  new = "new",
  duplicate = "duplicate",
  remove = "remove",
  rename = "rename",
  open = "open",
  close = "close",
  move = "move",
  undo = "undo",
  redo = "redo",
  previous = "previous",
  next = "next",
  click = "click",
  start = "start",
  stop = "stop",
  create = "create",
  install = "install",
  build = "build",
  browse = "browse",
}

export enum CompositionKeyword {
  for = "for",
  element = "element",
  else = "else",
  elseIf = "else if",
  indent = "indent",
  new = "new",
  keyword = "keyword",
  try = "try",
}

export enum CompositionTextKeyword {
  text = "text",
  comment = "comment",
  keyword = "keyword",
}

export enum CompositionSymbolKeyword {
  symbol = "symbol",
  condition = "condition",
}

export enum CompositionListKeyword {
  array = "array",
  object = "object",
}

export enum EditingKeyword {
  line = "line",
}

export enum NavigationKeyword {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
  terminal = "terminal",
  word = "word",
  line = "line",
  function = "function",
  element = "element",
  definition = "definition",
  file = "file",
}

export enum SystemKeyword {
  file = "file",
  history = "history",
  files = "files",
}

export enum EditingValue {
  container = "<s*div[^>]*>|<s*/s*div>",
  paragraph = "<s*p[^>]*>|<s*/s*p>",
  heading = "<s*h$[^>]*>|<s*/s*h$>",
  unordered = "<s*ul[^>]*>|<s*/s*ul>",
  ordered = "<s*ol[^>]*>|<s*/s*ol>",
  anchor = "<s*a[^>]*>|<s*/s*a>",
  image = "<s*img[^>]*>",
}

export enum ElementTags {
  container = "div",
  paragraph = "p",
  heading = "h$",
  unordered = "ul",
  ordered = "ol",
  anchor = "a",
  image = "img",
}
