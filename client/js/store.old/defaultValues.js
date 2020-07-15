import { notesThatMatch } from 'app/utils';

export default {
  status: 'idle', /* idle, configuring, running */
  stats: { /* current statistics */
    hits: 0,
    miss: 0,
    score: 0,
    attempts: 0,
    status: 'not_started', /* not_started, in_progress, canceled, completed */
  },
  notes: [],
  midi: [],
  config: {
    midiInput: null,
    clef: 'treble',
    lowerNote: 'C/4',
    upperNote: 'B/5',
    totalNotes: 0, /* 0 means random from 1 up to maxNotes */
    maxNotes: 2, /* in random mode */
    includeAccidentals: true,
    showNotesName: false,
  },

  userHasScored: function () {
    const matchNotes = notesThatMatch(this.midi, this.notes);
    return (
      this.status === 'running' &&
      this.notes.length > 0 &&
      this.notes.length === this.midi.length &&
      matchNotes.length === this.notes.length
    );
  },

  userHasMissed: function () {
    return (
      this.notes.length > 0 &&
      this.midi.length > 0 &&
      this.midi.length >= this.notes.length
    );
  },
};
