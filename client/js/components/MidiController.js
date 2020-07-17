import React, { useContext, useEffect, useCallback } from 'react';

import { isSupported, addNoteToMidi, removeNoteFromMidi, generateRandomNotes } from 'app/utils';

import { useSelector, useDispatch } from 'react-redux';

export default () => {

  const config = useSelector(state => state.config);
  const dispatch = useDispatch();

  const handleMidiInput = useCallback((message) => {
    const [ command, midiNote ] = message.data;

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
  }, [dispatch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' && !e.repeat) { /* correct notes */
      dispatch({ type: 'SET_CORRECT_MIDI_NOTES' });
    } else if (e.key === 'ArrowLeft' && !e.repeat) { /* random notes (wrong) */
      dispatch({ type: 'SET_RANDOM_MIDI_NOTES' });
    }
  }, [dispatch]);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      dispatch({ type: 'CLEAR_MIDI_NOTES' });
    }
  }, [dispatch]);

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
    navigator.requestMIDIAccess()
      .then(access => {
        const inputs = access.inputs.values();
        const midiInputs = Array.from(inputs);
        const inputToSelect = midiInputs.find(input => input.id === savedMidiDevice) || null;
        if (inputToSelect) dispatch({ type: 'UPDATE_CONFIG', value: { midiInput: inputToSelect } });
      });
  }, [dispatch]);

  useEffect(() => {
    if (config.midiInput !== null) {
      config.midiInput.addEventListener('midimessage', handleMidiInput);
      window.localStorage.setItem('midiDevice', config.midiInput.id);
      return () => {
        config.midiInput.removeEventListener('midimessage', handleMidiInput);
      };
    }
  }, [config.midiInput, handleMidiInput]);

  return null;

};

