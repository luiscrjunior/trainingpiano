export default {
  status: 'idle', /* idle, configuring, running */
  stats: { /* current statistics */
    notes: 0,
    hits: 0,
  },
  notes: [],
  midi: [],
  config: {
    lowerNote: 'C/4',
    upperNote: 'B/5',
    totalNotes: 0, /* 0 means random from 1 up to maxNotes */
    maxNotes: 2, /* in random mode */
    includeAccidentals: true,
    showNotesName: false,
  },
};
