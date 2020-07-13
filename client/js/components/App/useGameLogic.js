import React, { useEffect, useContext, useState } from 'react';

import { Context } from 'store';
import useAnalytics from './useAnalytics';
import { generateRandomNotes, getNotesScore } from 'app/utils';

export default () => {

  const [state, dispatch] = useContext(Context);
  const [showFinishedPanel, setShowFinishedPanel] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {

    if (state.status === 'running') {
      const newNotes = generateRandomNotes(state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      dispatch({ type: 'UPDATE_STATS', value: { hits: 0, miss: 0, attempts: 0, score: 0, status: 'in_progress' } });
    };

    if (state.status === 'idle') {
      dispatch({ type: 'UPDATE_NOTES', value: [] });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      if (state.stats.status === 'canceled' || state.stats.status === 'completed') setShowFinishedPanel(true);
    };

  }, [state.status]);

  useEffect(() => {

    if (state.userHasScored()) { /* user pressed the correct keys */
      const newNotes = generateRandomNotes(state.config);
      const notesScore = getNotesScore(state.notes, state.config.showNotesName, state.config.clef);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      const hits = state.stats.attempts === 0 ? 1 : 0;
      const score = state.stats.attempts === 0 ? notesScore : 0;
      dispatch({ type: 'UPDATE_STATS', value: { hits: state.stats.hits + hits, attempts: 0, score: state.stats.score + score } });
    } else if (state.userHasMissed()) {
      const miss = state.stats.attempts === 0 ? 1 : 0;
      dispatch({ type: 'UPDATE_STATS', value: { miss: state.stats.miss + miss, attempts: state.stats.attempts + 1 } });
    }

  }, [state.midi]);

  const startSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'configuring' });
  };

  const cancelSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
    dispatch({ type: 'UPDATE_STATS', value: { status: 'canceled' } });
  };

  const resetSequence = () => {
    trackEvent({ action: `Exercise ${state.stats.status}`, value: state.stats, numericValue: state.stats.score });
    dispatch({ type: 'UPDATE_STATS', value: { hits: 0, miss: 0, attempts: 0, score: 0, status: 'not_started' } });
    setShowFinishedPanel(false);
  };

  return [startSequence, cancelSequence, resetSequence, showFinishedPanel];

};
