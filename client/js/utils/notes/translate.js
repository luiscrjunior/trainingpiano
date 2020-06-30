const notes = {
  'A': 'A',
  'B': 'B',
  'C': 'C',
  'D': 'D',
  'E': 'E',
  'F': 'F',
  'G': 'G',
};

export const translateNote = (note) => {
  let noteParts = note.match(/([ABCDEFG])([#b])?(\/\d)?/);
  if (!noteParts) return '(sem tradução)';
  const noteName = noteParts[1];
  const accidental = noteParts[2] || null;
  const octave = noteParts[3];
  return `${notes[noteName] || noteName} ${accidental || ''}`;
};
