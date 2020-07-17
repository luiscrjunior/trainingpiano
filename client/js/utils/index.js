export * from './notes';

export const isSupported = () =>
  'requestMIDIAccess' in navigator &&
  typeof navigator['requestMIDIAccess'] === 'function';
