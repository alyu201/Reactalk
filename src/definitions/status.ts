export enum STATUS {
  LISTEN,
  STOP,
  PAUSE,
}

declare global {
  var ReactalkStatus: STATUS;
}

// This is needed, or else all variables will become of type 'any'
export {};
