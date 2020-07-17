import {
  lowerNoteFromTable,
  upperNoteFromTable,
  findMidiNote,
  findNotes,
} from 'app/utils';

describe('midi utility', () => {
  test('lowerNoteFromTable and upperNoteFromTable', () => {
    expect(lowerNoteFromTable()).toBe(24);
    expect(upperNoteFromTable()).toBe(95);
  });
  test('findMidiNote', () => {
    expect(findMidiNote('C/4')).toBe(60);
    expect(findMidiNote('D/4')).not.toBe(60);
  });
  test('findNotes', () => {
    expect(findNotes(58)).toEqual(['A#/3', 'Bb/3']);
    expect(findNotes(60)).not.toEqual(['A#/3', 'Bb/3']);
  });
});
