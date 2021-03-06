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
  '47': ['B/2'],
  '46': ['A#/2', 'Bb/2'],
  '45': ['A/2'],
  '44': ['G#/2', 'Ab/2'],
  '43': ['G/2'],
  '42': ['F#/2', 'Gb/2'],
  '41': ['F/2'],
  '40': ['E/2'],
  '39': ['D#/2', 'Eb/2'],
  '38': ['D/2'],
  '37': ['C#/2', 'Db/2'],
  '36': ['C/2'],
  '35': ['B/1'],
  '34': ['A#/1', 'Bb/1'],
  '33': ['A/1'],
  '32': ['G#/1', 'Ab/1'],
  '31': ['G/1'],
  '30': ['F#/1', 'Gb/1'],
  '29': ['F/1'],
  '28': ['E/1'],
  '27': ['D#/1', 'Eb/1'],
  '26': ['D/1'],
  '25': ['C#/1', 'Db/1'],
  '24': ['C/1'],
};

export default notesTable;

export const lowerNoteFromTable = () =>
  Math.min(...Object.keys(notesTable).map((note) => parseInt(note)));

export const upperNoteFromTable = () =>
  Math.max(...Object.keys(notesTable).map((note) => parseInt(note)));

export const findMidiNote = (noteName) => {
  for (let k in notesTable) {
    if (notesTable[k].some((note) => note === noteName)) return parseInt(k);
  }
  return null;
};

export const findNotes = (midiNote) =>
  notesTable[Number.isInteger(midiNote) ? midiNote.toString() : midiNote];
