import React, { useEffect, useContext, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import useAnalytics from './useAnalytics';
import { generateRandomNotes, getNotesScore } from 'app/utils';

export default () => {

  const status = useSelector(state => state.status);
  const stats = useSelector(state => state.stats);
  const notes = useSelector(state => state.notes);
  const config = useSelector(state => state.config);
  const userHasScored = useSelector(state => state.userHasScored());
  const userHasMissed = useSelector(state => state.userHasMissed());
  const dispatch = useDispatch();
  const [showFinishedPanel, setShowFinishedPanel] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {

    if (status === 'running') {
      const newNotes = generateRandomNotes(config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      dispatch({ type: 'UPDATE_STATS', value: { hits: 0, miss: 0, attempts: 0, score: 0, status: 'in_progress' } });
    };

    if (status === 'idle') {
      dispatch({ type: 'UPDATE_NOTES', value: [] });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      if (stats.status === 'canceled' || stats.status === 'completed') setShowFinishedPanel(true);
    };

  }, [status]);

  useEffect(() => {
    if (userHasScored) { /* user pressed the correct keys */
      const newNotes = generateRandomNotes(config);
      const notesScore = getNotesScore(notes, config.showNotesName, config.clef);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      const hits = stats.attempts === 0 ? 1 : 0;
      const score = stats.attempts === 0 ? notesScore : 0;
      dispatch({ type: 'UPDATE_STATS', value: { hits: stats.hits + hits, attempts: 0, score: stats.score + score } });
    } else if (userHasMissed) {
      const miss = stats.attempts === 0 ? 1 : 0;
      dispatch({ type: 'UPDATE_STATS', value: { miss: stats.miss + miss, attempts: stats.attempts + 1 } });
    }
  }, [userHasScored, userHasMissed]);

  const startSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'configuring' });
  };

  const cancelSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
    dispatch({ type: 'UPDATE_STATS', value: { status: 'canceled' } });
  };

  const resetSequence = () => {
    trackEvent({ action: `Exercise ${stats.status}`, value: stats, numericValue: stats.score });
    dispatch({ type: 'UPDATE_STATS', value: { hits: 0, miss: 0, attempts: 0, score: 0, status: 'not_started' } });
    setShowFinishedPanel(false);
  };

  return [startSequence, cancelSequence, resetSequence, showFinishedPanel];

};
