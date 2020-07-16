import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import useAnalytics from './useAnalytics';
import useScore from './useScore';

export default () => {

  const stats = useSelector(state => state.stats);
  const [userHasScored, userHasMissed] = useScore();

  const dispatch = useDispatch();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (userHasScored) {
      dispatch({ type: 'CORRECT_ANSWER' });
    } else if (userHasMissed) {
      dispatch({ type: 'INCORRECT_ANSWER' });
    }
  }, [userHasScored, userHasMissed]);

  const configureExercise = () => {
    dispatch({ type: 'CONFIGURE_EXERCISE' });
  };

  const cancelExercise = () => {
    dispatch({ type: 'CANCEL_EXERCISE' });
  };

  const resetExercise = () => {
    trackEvent({ action: `Exercise ${stats.status}`, value: stats, numericValue: stats.score });
    dispatch({ type: 'RESET_EXERCISE' });
  };

  return [configureExercise, cancelExercise, resetExercise];

};
