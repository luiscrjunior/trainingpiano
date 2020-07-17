import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import useAnalytics from './useAnalytics';
import useScore from './useScore';

export default () => {
  const stats = useSelector((state) => state.stats);
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

  return [configureExercise, cancelExercise, finishExercise, resetExercise];
};
