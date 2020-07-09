import React, { useContext, useEffect, useCallback } from 'react';

import { isSupported, addNoteToMidi, removeNoteFromMidi, generateRandomNotes } from 'app/utils';

import { Context } from 'store';

export default () => {

  const [state, dispatch] = useContext(Context);

  const handleMidiInput = useCallback((message) => {
    const [ command, midiNote ] = message.data;

    switch (command) {
    case 128: {
      const newNotes = removeNoteFromMidi(midiNote, state.midi);
      dispatch({ type: 'UPDATE_MIDI', value: newNotes });
      break;
    }
    case 144: {
      const newNotes = addNoteToMidi(midiNote, state.midi, state.notes);
      dispatch({ type: 'UPDATE_MIDI', value: newNotes });
      break;
    }
    }
  });

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'a' && !e.repeat) { /* correct notes */
      dispatch({ type: 'UPDATE_MIDI', value: [...state.notes] });
    } else if (e.key === 's' && !e.repeat) { /* random notes (wrong) */
      dispatch({ type: 'UPDATE_MIDI', value: generateRandomNotes(state.config) });
    }
  });

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'a' || e.key === 's') {
      dispatch({ type: 'UPDATE_MIDI', value: [] });
    }
  });

  /* only in development: hack to hit or miss the notes */
  if (process.env.NODE_ENV !== 'production') {
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, [state.notes]);
  }

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
  }, []);

  useEffect(() => {
    if (state.config.midiInput !== null) {
      state.config.midiInput.addEventListener('midimessage', handleMidiInput);
      window.localStorage.setItem('midiDevice', state.config.midiInput.id);
      return () => {
        state.config.midiInput.removeEventListener('midimessage', handleMidiInput);
      };
    }
  }, [state.config.midiInput, handleMidiInput]);

  return null;

};

