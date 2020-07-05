import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'store';

import { FormItem, Span, Toggle } from 'components/shared';

import NotesSelector from './NotesSelector.js';
import { isSupported } from 'app/utils';

import styled from 'styled-components';

const Area = styled.div``;

const Hint = styled(Span)`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 11px;
`;

export default () => {

  const [state, dispatch] = useContext(Context);
  const [midiInputs, setMidiInputs] = useState([]);

  const updateConfig = (item) => {
    dispatch({ type: 'UPDATE_CONFIG', value: item });
  };

  useEffect(() => {
    if (!isSupported()) return;
    navigator.requestMIDIAccess()
      .then(access => {
        const inputs = access.inputs.values();
        setMidiInputs(Array.from(inputs));
      });
  }, []);

  const selectMidiInput = (inputId) => {
    const inputToSelect = midiInputs.find(input => input.id === inputId) || null;
    updateConfig({ 'midiInput': inputToSelect });
  };

  const onSelectMidiInput = (e) => selectMidiInput(e.target.value);

  return <Area>

    <FormItem label='Input Device' >
      <select value={state.config.midiInput ? state.config.midiInput.id : ''} onChange={onSelectMidiInput}>
        <option>Escolha um dispositivo...</option>
        {midiInputs.map(midiInput => <option key={midiInput.id} value={midiInput.id}>{midiInput.name}</option>)}
      </select>
    </FormItem>

    <FormItem label='Show note names?' >
      <Toggle checked={state.config.showNotesName} onChange={ (e) => updateConfig({ 'showNotesName': e.target.checked })} />
    </FormItem>

    <FormItem label='How many notes simultaneously?' >
      <select value={state.config.totalNotes} onChange={ (e) => updateConfig({ 'totalNotes': parseInt(e.target.value) })}>
        <option value={0}>Random</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      { state.config.totalNotes === 0 &&
        <>
          <Hint><strong>1</strong> note up to</Hint>
          <select value={state.config.maxNotes} onChange={ (e) => updateConfig({ 'maxNotes': parseInt(e.target.value) })}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Hint>notes.</Hint>
        </>
      }
    </FormItem>

    <FormItem label='Include sharp (#) and flat (b) ?' >
      <Toggle checked={state.config.includeAccidentals} onChange={ (e) => updateConfig({ 'includeAccidentals': e.target.checked })} />
    </FormItem>

    <FormItem label='Notes:' >
      <NotesSelector
        onChange={ (lowerNote, upperNote) => updateConfig({ 'lowerNote': lowerNote, 'upperNote': upperNote })}
      />
    </FormItem>

  </Area>;

};

