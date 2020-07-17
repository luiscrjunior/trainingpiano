import reducer from 'store/reducer.js';
import defaultValues from 'store/defaultValues.js';

describe('root reducer', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({ ...defaultValues });
  });

  it('key press / release', () => {
    expect(
      reducer(
        { ...defaultValues, midi: [] },
        { type: 'PIANO_KEY_PRESS', midiNote: 60 }
      )
    ).toEqual({ ...defaultValues, midi: ['C/4'] });
    expect(
      reducer(
        { ...defaultValues, midi: ['C/4'] },
        { type: 'PIANO_KEY_RELEASE', midiNote: 60 }
      )
    ).toEqual({ ...defaultValues, midi: [] });
  });

  it('correct answer (user scored)', () => {
    expect(
      reducer(
        {
          ...defaultValues,
          status: 'running',
          notes: ['C/4', 'D/4'],
          stats: { status: 'in_progress', hits: 2, attempts: 0, score: 0 },
        },
        { type: 'CORRECT_ANSWER' }
      )
    ).toEqual({
      ...defaultValues,
      status: 'running',
      midi: [],
      notes: expect.any(Array),
      stats: {
        status: 'in_progress',
        hits: 3,
        attempts: 0,
        score: 15,
      },
    });
  });
  it('correct answer (user not scored)', () => {
    expect(
      reducer(
        {
          ...defaultValues,
          status: 'running',
          notes: ['C/4', 'D/4'],
          stats: { status: 'in_progress', hits: 2, attempts: 1, score: 15 },
        },
        { type: 'CORRECT_ANSWER' }
      )
    ).toEqual({
      ...defaultValues,
      status: 'running',
      midi: [],
      notes: expect.any(Array),
      stats: {
        status: 'in_progress',
        hits: 2,
        attempts: 0,
        score: 15,
      },
    });
  });
  it('incorrect answer (first attempt)', () => {
    expect(
      reducer(
        {
          ...defaultValues,
          status: 'running',
          notes: ['C/4', 'D/4'],
          stats: { status: 'in_progress', miss: 0, attempts: 0, score: 15 },
        },
        { type: 'INCORRECT_ANSWER' }
      )
    ).toEqual({
      ...defaultValues,
      status: 'running',
      midi: [],
      notes: ['C/4', 'D/4'],
      stats: {
        status: 'in_progress',
        miss: 1,
        attempts: 1,
        score: 15,
      },
    });
  });
  it('incorrect answer (next attempt)', () => {
    expect(
      reducer(
        {
          ...defaultValues,
          status: 'running',
          notes: ['C/4', 'D/4'],
          stats: { status: 'in_progress', miss: 1, attempts: 1, score: 15 },
        },
        { type: 'INCORRECT_ANSWER' }
      )
    ).toEqual({
      ...defaultValues,
      status: 'running',
      midi: [],
      notes: ['C/4', 'D/4'],
      stats: {
        status: 'in_progress',
        miss: 1,
        attempts: 2,
        score: 15,
      },
    });
  });
});
