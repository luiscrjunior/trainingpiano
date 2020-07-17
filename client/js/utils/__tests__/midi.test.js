import { addNoteToMidi, removeNoteFromMidi, notesThatMatch } from 'app/utils';

describe('midi utility', () => {
  test('addNoteToMidi', () => {
    expect(addNoteToMidi(64, ['C/4', 'D/4'], [])).toEqual([
      'C/4',
      'D/4',
      'E/4',
    ]);

    /* already have the note */
    expect(addNoteToMidi(64, ['C/4', 'D/4'], ['E/4'])).toEqual([
      'C/4',
      'D/4',
      'E/4',
    ]);

    /* add and sort */
    expect(addNoteToMidi(64, ['F/4', 'G/4'], ['E/4'])).toEqual([
      'E/4',
      'F/4',
      'G/4',
    ]);
  });

  test('removeNoteFromMidi', () => {
    expect(removeNoteFromMidi(64, ['C/4', 'E/4'])).toEqual(['C/4']);

    /* note don't exist */
    expect(removeNoteFromMidi(64, ['C/4', 'D/4'])).toEqual(['C/4', 'D/4']);
  });

  test('notesThatMatch', () => {
    expect(notesThatMatch(['C/4', 'E/4'], ['C/4', 'E/4'])).toEqual([0, 1]);
    expect(notesThatMatch(['C/4', 'F/4'], ['C/4', 'E/4'])).toEqual([0]);
    expect(notesThatMatch(['C/4', 'F/4'], ['B/4', 'G/4'])).toEqual([]);
  });
});
