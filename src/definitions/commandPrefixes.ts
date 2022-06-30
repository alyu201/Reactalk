export enum CompositionPrefixes {
  add = "add",
}

export enum EditingPrefixes {
  change = "change",
  delete = "delete",
  copy = "copy",
  paste = "paste",
}

export enum NavigationPrefixes {
  go = "go",
  goTo = "go to",
  focus = "focus",
}

export enum SystemPrefixes {
  save = "save",
  new = "new",
  duplicate = "duplicate",
  delete = "delete",
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
  createApp = "create app",
  install = "install",
  build = "build",
}

export enum CompositionKeyword {
  for = "for",
  element = "element",
  text = "text",
  else = "else",
}

export enum EditingKeyword {
  line = "line",
}

// This is so far only for up/down/left/right
// The remaining keywords will use files instead.
export enum NavigationKeyword {
  up = "up",
  down = "down",
  left = "left",
  right = "right"
}

export enum EditingValue {
  container = "<div> </div>",
  paragraph = "<p> </p>",
  heading = "<h[1-6>] </h[1-6]>",
  unordered = "<ul> </ul>",
  ordered = "<ol> </ol>",
  anchor = "<a </a>",
  image = "<img />",
  element = "element",
  text = "text",
  else = "else",
}
