import notesTable, { lowerNoteFromTable, upperNoteFromTable, findMidiNote } from './notesTable.js';

const findNoteFromMidiNote = (midiNote) => midiNote in notesTable ? notesTable[midiNote][0] : null;

const sortNotes = (notes) => {
  return notes.sort((a, b) => {
    const [midiA, midiB] = [findMidiNote(a), findMidiNote(b)];
    if (midiA < midiB) return -1;
    if (midiA > midiB) return 1;
    if (midiA === midiB) return 0;
  });
};

export const addNoteToMidi = (midiNote, notes) => {
  const midiNoteNumber = parseInt(midiNote);
  if (midiNoteNumber < lowerNoteFromTable() || midiNoteNumber > upperNoteFromTable()) return [...notes];
  const newNote = findNoteFromMidiNote(midiNote);
  const newNotes = [...notes, newNote];
  const sortedNotes = sortNotes(newNotes);
  return sortedNotes;
};

export const removeNoteFromMidi = (midiNote, notes) => {
  const newNote = findNoteFromMidiNote(midiNote);
  return notes.filter(note => note !== newNote);
};
