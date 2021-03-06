import { useEffect, useCallback } from 'react';

import { isSupported } from 'app/utils';

import { useSelector, useDispatch } from 'react-redux';

export default () => {
  const midiInput = useSelector((state) => state.config.midiInput);
  const dispatch = useDispatch();

  const handleMidiInput = useCallback(
    (message) => {
      const [command, midiNote] = message.data;

      switch (command) {
        case 128: {
          dispatch({ type: 'PIANO_KEY_RELEASE', midiNote: midiNote });
          break;
        }
        case 144: {
          dispatch({ type: 'PIANO_KEY_PRESS', midiNote: midiNote });
          break;
        }
      }
    },
    [dispatch]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight' && !e.repeat) {
        /* correct notes */
        dispatch({ type: 'SET_CORRECT_MIDI_NOTES' });
      } else if (e.key === 'ArrowLeft' && !e.repeat) {
        /* random notes (wrong) */
        dispatch({ type: 'SET_RANDOM_MIDI_NOTES' });
      }
    },
    [dispatch]
  );

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        dispatch({ type: 'CLEAR_MIDI_NOTES' });
      }
    },
    [dispatch]
  );

  /* only in development: hack to hit or miss the notes */
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    /* load input device from localStorage */
    const savedMidiDevice = window.localStorage.getItem('midiDevice');
    if (!savedMidiDevice) return;
    if (!isSupported()) return;
    navigator.requestMIDIAccess().then((access) => {
      const inputs = access.inputs.values();
      const midiInputs = Array.from(inputs);
      const inputToSelect =
        midiInputs.find((input) => input.id === savedMidiDevice) || null;
      if (inputToSelect)
        dispatch({
          type: 'UPDATE_CONFIG',
          value: { midiInput: inputToSelect },
        });
    });
  }, [dispatch]);

  useEffect(() => {
    if (midiInput !== null) {
      midiInput.addEventListener('midimessage', handleMidiInput);
      window.localStorage.setItem('midiDevice', midiInput.id);
      return () => {
        midiInput.removeEventListener('midimessage', handleMidiInput);
      };
    } else {
      window.localStorage.removeItem('midiDevice');
    }
  }, [midiInput, handleMidiInput]);
};
