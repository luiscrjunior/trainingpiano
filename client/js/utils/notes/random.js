import notesTable from './notesTable.js';

const lowerNoteFromTable = Math.min(...Object.keys(notesTable).map(note => parseInt(note)));
const upperNoteFromTable = Math.max(...Object.keys(notesTable).map(note => parseInt(note)));

/* https://stackoverflow.com/a/1527820/3889043 */
const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomItemFromArray = (array) => array[randomNumber(0, array.length - 1)];

const findMidiNote = (noteName) => {
  for (let k in notesTable) {
    if (notesTable[k].some(note => note === noteName)) return parseInt(k);
  }
  return null;
};

const notesHasAccidentals = (notes) => notes.some(note => /#/.test(note) || /b/.test(note));

const getNextRandomNote = (lowerMidiNote, upperMidiNote, includeAccidentals, randomNotes) => {

  const lastNote = randomNotes.length >= 1 ? randomNotes[randomNotes.length - 1] : null;
  const min = lastNote ? lastNote.midi + 3 : lowerMidiNote; /* next note, +3 midi tones above */
  const max = lastNote ? lastNote.midi + 7 : upperMidiNote;

  const eligibleNotes = [];
  for (let i = min; i <= max && i <= upperMidiNote; i++) {
    const notesFromMidiNumber = notesTable[i.toString()];
    const hasAccidentals = notesHasAccidentals(notesFromMidiNumber);
    if (
      includeAccidentals === true ||
      (includeAccidentals === false && !hasAccidentals)
    ) eligibleNotes.push({ midi: i, notes: notesFromMidiNumber });
  }

  if (eligibleNotes.length === 0) return null;

  const randomNote = randomItemFromArray(eligibleNotes);
  return { midi: randomNote.midi, note: randomItemFromArray(randomNote.notes) };
};

export const generateRandomNotes = ({
  lowerNote = 'C/4',
  upperNote = 'B/5',
  maxNotes = 4,
  totalNotes = 2, /* 0 means random from 1 up to maxNotes */
  includeAccidentals = true,
} = {}) => {

  totalNotes = totalNotes === 0 ? randomNumber(1, maxNotes) : totalNotes;

  const lowerMidiNote = findMidiNote(lowerNote) || lowerNoteFromTable;
  const upperMidiNote = findMidiNote(upperNote) || upperNoteFromTable;

  let randomNotes = [];
  let attempts = 1;
  while (randomNotes.length < totalNotes && attempts < 200) {
    const randomNote = getNextRandomNote(lowerMidiNote, upperMidiNote, includeAccidentals, randomNotes);
    if (!randomNote) {
      randomNotes = []; /* restart */
      attempts++;
      continue;
    }
    randomNotes.push(randomNote);
  }
  return randomNotes.map(randomNote => randomNote.note);

};
