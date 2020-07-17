import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { octavesToSelect } from 'components/ConfigArea';
import useAnalytics from './useAnalytics';
import useScore from './useScore';

export default () => {
  const stats = useSelector((state) => state.stats);
  const clef = useSelector((state) => state.config.clef);
  const [userHasScored, userHasMissed] = useScore();

  const dispatch = useDispatch();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (userHasScored) {
      dispatch({ type: 'CORRECT_ANSWER' });
    } else if (userHasMissed) {
      dispatch({ type: 'INCORRECT_ANSWER' });
    }
  }, [userHasScored, userHasMissed, dispatch]);

  const configureExercise = () => {
    dispatch({ type: 'CONFIGURE_EXERCISE' });
  };

  const cancelExercise = () => {
    trackEvent({
      action: 'Exercise canceled',
      value: stats,
      numericValue: stats.score,
    });
    dispatch({ type: 'CANCEL_EXERCISE' });
  };

  const finishExercise = () => {
    trackEvent({
      action: 'Exercise completed',
      value: stats,
      numericValue: stats.score,
    });
    dispatch({ type: 'FINISH_EXERCISE' });
  };

  const resetExercise = () => {
    dispatch({ type: 'RESET_EXERCISE' });
  };

  /* update lower note and upper note each time clef changes */
  useEffect(() => {
    const availableClefs = octavesToSelect(clef);
    dispatch({
      type: 'UPDATE_CONFIG',
      value: {
        lowerNote: `C/${availableClefs[1]}`,
        upperNote: `B/${availableClefs[2]}`,
      },
    });
  }, [clef, dispatch]);

  return [configureExercise, cancelExercise, finishExercise, resetExercise];
};
