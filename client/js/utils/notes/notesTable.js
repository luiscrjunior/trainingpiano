const notesTable = {
  '95': ['B/6'],
  '94': ['A#/6', 'Bb/6'],
  '93': ['A/6'],
  '92': ['G#/6', 'Ab/6'],
  '91': ['G/6'],
  '90': ['F#/6', 'Gb/6'],
  '89': ['F/6'],
  '88': ['E/6'],
  '87': ['D#/6', 'Eb/6'],
  '86': ['D/6'],
  '85': ['C#/6', 'Db/6'],
  '84': ['C/6'],
  '83': ['B/5'],
  '82': ['A#/5', 'Bb/5'],
  '81': ['A/5'],
  '80': ['G#/5', 'Ab/5'],
  '79': ['G/5'],
  '78': ['F#/5', 'Gb/5'],
  '77': ['F/5'],
  '76': ['E/5'],
  '75': ['D#/5', 'Eb/5'],
  '74': ['D/5'],
  '73': ['C#/5', 'Db/5'],
  '72': ['C/5'],
  '71': ['B/4'],
  '70': ['A#/4', 'Bb/4'],
  '69': ['A/4'],
  '68': ['G#/4', 'Ab/4'],
  '67': ['G/4'],
  '66': ['F#/4', 'Gb/4'],
  '65': ['F/4'],
  '64': ['E/4'],
  '63': ['D#/4', 'Eb/4'],
  '62': ['D/4'],
  '61': ['C#/4', 'Db/4'],
  '60': ['C/4'],
  '59': ['B/3'],
  '58': ['A#/3', 'Bb/3'],
  '57': ['A/3'],
  '56': ['G#/3', 'Ab/3'],
  '55': ['G/3'],
  '54': ['F#/3', 'Gb/3'],
  '53': ['F/3'],
  '52': ['E/3'],
  '51': ['D#/3', 'Eb/3'],
  '50': ['D/3'],
  '49': ['C#/3', 'Db/3'],
  '48': ['C/3'],
};

export default notesTable;

export const lowerNoteFromTable = () => Math.min(...Object.keys(notesTable).map(note => parseInt(note)));

export const upperNoteFromTable = () => Math.max(...Object.keys(notesTable).map(note => parseInt(note)));

export const findMidiNote = (noteName) => {
  for (let k in notesTable) {
    if (notesTable[k].some(note => note === noteName)) return parseInt(k);
  }
  return null;
};
