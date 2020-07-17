import { useSelector } from 'react-redux';
import { notesThatMatch } from 'app/utils';

export default () => {
  const userHasScored = useSelector((state) => {
    const matchNotes = notesThatMatch(state.midi, state.notes);
    return (
      state.status === 'running' &&
      state.notes.length > 0 &&
      state.notes.length === state.midi.length &&
      matchNotes.length === state.notes.length
    );
  });

  const userHasMissed = useSelector((state) => {
    const matchNotes = notesThatMatch(state.midi, state.notes);
    return (
      state.status === 'running' &&
      state.notes.length > 0 &&
      state.midi.length > 0 &&
      state.midi.length >= state.notes.length &&
      matchNotes.length !== state.notes.length
    );
  });

  return [userHasScored, userHasMissed];
};
