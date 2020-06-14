import notesTable, { lowerNoteFromTable, upperNoteFromTable, findMidiNote } from './notesTable.js';

const findNoteFromMidiNote = (midiNote) => midiNote in notesTable ? notesTable[midiNote][0] : null;

const findAllNotesFromMidiNote = (midiNote) => midiNote in notesTable ? notesTable[midiNote] : null;

const sortNotes = (notes) => {
  return notes.sort((a, b) => {
    const [midiA, midiB] = [findMidiNote(a), findMidiNote(b)];
    if (midiA < midiB) return -1;
    if (midiA > midiB) return 1;
    if (midiA === midiB) return 0;
  });
};

export const addNoteToMidi = (midiNote, currentMidiNotes, currentNotes) => {
  const midiNoteNumber = parseInt(midiNote);
  if (midiNoteNumber < lowerNoteFromTable() || midiNoteNumber > upperNoteFromTable()) return [...currentMidiNotes]; /* note exceed app bounds */
  if (currentMidiNotes.some(note => findMidiNote(note) === midiNoteNumber)) return [...currentMidiNotes]; /* note already exists */
  const matchedNote = currentNotes.find(note => findMidiNote(note) === midiNoteNumber); /* if match with a random note, consider it */
  const newNote = matchedNote || findNoteFromMidiNote(midiNote); /* otherwise, choose first from array, normally # */
  const newNotes = [...currentMidiNotes, newNote];
  const sortedNotes = sortNotes(newNotes);
  return sortedNotes;
};

export const removeNoteFromMidi = (midiNote, notes) => {
  const allNotesFromMidiNote = findAllNotesFromMidiNote(midiNote);
  return notes.filter(note => !allNotesFromMidiNote.includes(note));
};

export const notesThatMatch = (currentMidiNotes, currentNotes) => {
  const notes = [];
  currentMidiNotes.forEach((currentMidiNote, idx) => {
    if (currentNotes.some(currentNote => currentNote === currentMidiNote)) notes.push(idx);
  });
  return notes;
};
