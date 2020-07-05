export const translateNote = (note, notesTranslation) => {
  let noteParts = note.match(/([ABCDEFG])([#b])?\/(\d)?/);
  if (!noteParts) return '(sem tradução)';
  const noteName = noteParts[1];
  const accidental = noteParts[2] || null;
  const octave = noteParts[3];
  return `${notesTranslation[noteName] || noteName} ${accidental || ''}`;
};
