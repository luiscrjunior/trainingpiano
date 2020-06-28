export default {
  status: 'idle', /* idle, configuring, running */
  stats: { /* current statistics */
    hits: 0,
    status: 'not_started', /* not_started, in_progress, canceled, completed */
  },
  notes: [],
  midi: [],
  config: {
    midiInput: null,
    lowerNote: 'C/4',
    upperNote: 'B/5',
    totalNotes: 0, /* 0 means random from 1 up to maxNotes */
    maxNotes: 2, /* in random mode */
    includeAccidentals: true,
    showNotesName: false,
  },
};
