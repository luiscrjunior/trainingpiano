import React, { useEffect, useContext, useState } from 'react';

import { Context } from 'store';
import useAnalytics from './useAnalytics';
import { generateRandomNotes, notesThatMatch, getNotesScore } from 'app/utils';

export default () => {

  const [state, dispatch] = useContext(Context);
  const [showFinishedPanel, setShowFinishedPanel] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {

    if (state.status === 'running') {
      const newNotes = generateRandomNotes(state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      dispatch({ type: 'UPDATE_STATS', value: { hits: 0, score: 0, status: 'in_progress' } });
    };

    if (state.status === 'idle') {
      dispatch({ type: 'UPDATE_NOTES', value: [] });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      if (state.stats.status === 'canceled' || state.stats.status === 'completed') setShowFinishedPanel(true);
    };

  }, [state.status]);

  useEffect(() => {

    const matchNotes = notesThatMatch(state.midi, state.notes);
    if (
      state.status === 'running' &&
      state.notes.length > 0 &&
      state.notes.length === state.midi.length &&
      matchNotes.length === state.notes.length
    ) { /* notes matched: hit */
      const newNotes = generateRandomNotes(state.config);
      const score = getNotesScore(state.notes, state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      dispatch({ type: 'UPDATE_STATS', value: { hits: state.stats.hits + 1, score: state.stats.score + score } });
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
    dispatch({ type: 'UPDATE_STATS', value: { hits: 0, score: 0, status: 'not_started' } });
    setShowFinishedPanel(false);
  };

  return [startSequence, cancelSequence, resetSequence, showFinishedPanel];

};
