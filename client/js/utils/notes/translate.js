const notes = {
  'A': 'Lá',
  'B': 'Si',
  'C': 'Dó',
  'D': 'Ré',
  'E': 'Mi',
  'F': 'Fá',
  'G': 'Sol',
};

export const translateNote = (note) => {
  let noteParts = note.match(/([ABCDEFG])([#b])?(\/\d)?/);
  if (!noteParts) return '(sem tradução)';
  const noteName = noteParts[1];
  const accidental = noteParts[2] || null;
  const octave = noteParts[3];
  return `${notes[noteName] || noteName} ${accidental || ''}`;
};
