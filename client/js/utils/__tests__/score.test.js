import { getNotesScore } from 'app/utils';

describe('midi utility', () => {
  test('generate score', () => {
    expect(getNotesScore(['C/3'], false, 'treble')).toBe(7);
    expect(getNotesScore(['C/4'], false, 'treble')).toBe(5);
    expect(getNotesScore(['C/5'], false, 'treble')).toBe(5);
    expect(getNotesScore(['C/6'], false, 'treble')).toBe(7);
    expect(getNotesScore(['C/3', 'C/4'], false, 'treble')).toBe(18);
    expect(getNotesScore(['C/1'], false, 'bass')).toBe(12);
    expect(getNotesScore(['C/2'], false, 'bass')).toBe(9);
    expect(getNotesScore(['C/3'], false, 'bass')).toBe(9);
    expect(getNotesScore(['C/4'], false, 'bass')).toBe(12);
    expect(getNotesScore(['C/1', 'C/3'], false, 'bass')).toBe(32);
    expect(getNotesScore(['C/1', 'C/3'], true, 'bass')).toBe(2);
  });
});
