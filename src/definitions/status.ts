export enum STATUS {
  LISTEN,
  STOP,
  PAUSE,
}

// This is a globabl variable to determine the state of whether we want to listen, pause or stop listening.
declare global {
  var ReactalkStatus: STATUS;
}

// This is needed, or else all variables will become of type 'any'
export {};
