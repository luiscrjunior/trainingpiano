export const getNotesScore = (notes, config) => {

  let score = 0;

  if (config.showNotesName) {
    return notes.length;
  }

  notes.forEach(note => {

    let noteParts = note.match(/([ABCDEFG])([#b])?\/(\d)?/);
    if (!noteParts) return;
    const noteName = noteParts[1];
    const accidental = noteParts[2] || null;
    const octave = parseInt(noteParts[3]) || 0;

    if (octave === 4 || octave === 5) { /* default value per note */
      score += 5;
    } else if (octave === 3 || octave === 6) { /* octaves 3 or 6: more valuable */
      score += 7;
    };

    if (accidental) score += 3;

  });

  if (notes.length === 2) {
    score = Math.round(score * 1.5);

  } else if (notes.length === 3) {
    score = Math.round(score * 2);

  } else if (notes.length === 4) {
    score = Math.round(score * 3);

  } else if (notes.length === 5) {
    score = Math.round(score * 4);
  }

  return score;

};
