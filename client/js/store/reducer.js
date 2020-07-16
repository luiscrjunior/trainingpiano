import { addNoteToMidi, removeNoteFromMidi, generateRandomNotes, getNotesScore } from 'app/utils';
import defaultValues from './defaultValues';

export default (state = defaultValues, action) => {
  switch (action.type) {

  /* user pressed piano key (phisical or virtual) */
  case 'PIANO_KEY_PRESS': {
    return {
      ...state,
      midi: addNoteToMidi(action.midiNote, state.midi, state.notes),
    };
  }

  /* user released piano key (phisical or virtual) */
  case 'PIANO_KEY_RELEASE': {
    return {
      ...state,
      midi: removeNoteFromMidi(action.midiNote, state.midi),
    };
  }

  /* set midi notes equal do notes (simulate correct answers) */
  case 'SET_CORRECT_MIDI_NOTES': {
    return {
      ...state,
      midi: [...state.notes],
    };
  }

  /* set random midi notes (simulate wrong answers) */
  case 'SET_RANDOM_MIDI_NOTES': {
    return {
      ...state,
      midi: generateRandomNotes(state.config),
    };
  }

  /* CLEAR MIDI NOTES */
  case 'CLEAR_MIDI_NOTES': {
    return {
      ...state,
      midi: [],
    };
  }

  /* correct answer */
  case 'CORRECT_ANSWER': {
    const newNotes = generateRandomNotes(state.config);
    const notesScore = getNotesScore(state.notes, state.config.showNotesName, state.config.clef);
    const hits = state.stats.attempts === 0 ? 1 : 0;
    const score = state.stats.attempts === 0 ? notesScore : 0;
    return {
      ...state,
      notes: newNotes,
      midi: [],
      stats: {
        ...state.stats,
        hits: state.stats.hits + hits,
        attempts: 0,
        score: state.stats.score + score,
      },
    };
  }

  /* incorrect answer */
  case 'INCORRECT_ANSWER': {
    const miss = state.stats.attempts === 0 ? 1 : 0;
    return {
      ...state,
      stats: {
        ...state.stats,
        miss: state.stats.miss + miss,
        attempts: state.stats.attempts + 1,
      },
    };
  }

  /* configure exercise */
  case 'CONFIGURE_EXERCISE': {
    return {
      ...state,
      status: 'configuring',
    };
  }

  /* start exercise */
  case 'START_EXERCISE': {
    return {
      ...state,
      status: 'running',
      notes: generateRandomNotes(state.config),
      midi: [],
      stats: {
        ...state.stats,
        hits: 0,
        miss: 0,
        attempts: 0,
        score: 0,
        status: 'in_progress',
      },
    };
  }

  /* exercise canceled */
  case 'CANCEL_EXERCISE': {
    return {
      ...state,
      status: 'idle',
      notes: [],
      midi: [],
      stats: {
        ...state.stats,
        status: 'canceled',
      },
      showFinishedPanel: true,
    };
  }

  /* exercise reset (after finished/canceled or cancel start) */
  case 'RESET_EXERCISE': {
    return {
      ...state,
      status: 'idle',
      notes: [],
      midi: [],
      stats: {
        ...state.stats,
        hits: 0,
        miss: 0,
        attempts: 0,
        score: 0,
        status: 'not_started',
      },
      showFinishedPanel: false,
    };
  }

  /* exercise finished */
  case 'FINISH_EXERCISE': {
    return {
      ...state,
      status: 'idle',
      stats: {
        ...state.stats,
        status: 'completed',
      },
      showFinishedPanel: true,
    };
  }

  case 'UPDATE_CONFIG':
    return {
      ...state,
      config: {
        ...state.config,
        ...action.value,
      },
    };

  default:
    return state;
  }
};

