const clefPoints = {
  treble: {
    '3': 7,
    '4': 5,
    '5': 5,
    '6': 7,
  },
  bass: {
    '1': 12,
    '2': 9,
    '3': 9,
    '4': 12,
  },
};

export const getNotesScore = (notes, showNotesName, clef) => {
  let score = 0;

  if (showNotesName) {
    return notes.length;
  }

  notes.forEach((note) => {
    let noteParts = note.match(/([ABCDEFG])([#b])?\/(\d)?/);
    if (!noteParts) return;
    /* const noteName = noteParts[1]; */
    const accidental = noteParts[2] || null;
    const octave = noteParts[3] || 0;

    score +=
      clefPoints[clef] && clefPoints[clef][octave]
        ? clefPoints[clef][octave]
        : 0;

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
