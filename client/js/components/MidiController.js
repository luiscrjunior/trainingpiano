import React, { useContext, useEffect, useState, useCallback } from 'react';

import { addNoteToMidi, removeNoteFromMidi } from 'app/utils';

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

  useEffect(() => {
    /* load input device from localStorage */
    const savedMidiDevice = window.localStorage.getItem('midiDevice');
    if (!savedMidiDevice) return;
    if (typeof navigator['requestMIDIAccess'] === 'undefined') return;
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

