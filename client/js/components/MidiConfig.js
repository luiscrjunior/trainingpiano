import React, { useContext, useEffect, useState, useCallback } from 'react';

import { addNoteToMidi, removeNoteFromMidi } from 'app/utils';

import { Context } from 'store';

export default () => {

  const [state, dispatch] = useContext(Context);
  const [inputs, setInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);

  const handleMidiInput = useCallback((message) => {
    const [ command, midiNote ] = message.data;

    switch (command) {
    case 128: {
      const newNotes = removeNoteFromMidi(midiNote, state.midi);
      dispatch({ type: 'UPDATE_MIDI', value: newNotes });
      break;
    }
    case 144: {
      const newNotes = addNoteToMidi(midiNote, state.midi);
      dispatch({ type: 'UPDATE_MIDI', value: newNotes });
      break;
    }
    }
  });

  useEffect(() => {
    navigator.requestMIDIAccess()
      .then(access => {
        const inputs = access.inputs.values();
        setInputs(Array.from(inputs));
      });
  }, []);

  useEffect(() => {
    const savedMidiDevice = window.localStorage.getItem('midiDevice');
    if (savedMidiDevice) selectInput(savedMidiDevice);
  }, [inputs]);

  useEffect(() => {
    if (selectedInput !== null) {
      selectedInput.addEventListener('midimessage', handleMidiInput);
      window.localStorage.setItem('midiDevice', selectedInput.id);
      return () => {
        selectedInput.removeEventListener('midimessage', handleMidiInput);
      };
    }
  }, [selectedInput, handleMidiInput]);

  const selectInput = (inputId) => {
    const inputToSelect = inputs.find(input => input.id === inputId) || null;
    setSelectedInput(inputToSelect);
  };

  const onSelectInput = (e) => selectInput(e.target.value);

  return <div>

    { inputs.length > 0 &&
      <select value={selectedInput ? selectedInput.id : ''} onChange={onSelectInput}>
        <option>Escolha um dispositivo...</option>
        {inputs.map(input => <option key={input.id} value={input.id}>{input.name}</option>)}
      </select>
    }
  </div>;

};

