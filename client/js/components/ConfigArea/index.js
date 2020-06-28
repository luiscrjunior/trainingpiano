import React, { useContext } from 'react';
import MidiConfig from 'components/MidiConfig';
import { Context } from 'store';

import { FormItem, Span, Toggle } from 'components/shared';

import NotesSelector from './NotesSelector.js';

import styled from 'styled-components';
import { lowerNoteFromTable } from '../../utils/notes/notesTable.js';

const Area = styled.div`
  margin-top: 30px;
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
`;

const Hint = styled(Span)`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 11px;
`;

export default () => {

  const [state, dispatch] = useContext(Context);

  const updateConfig = (item) => {
    dispatch({ type: 'UPDATE_CONFIG', value: item });
  };

  return <Area>

    <FormItem label='Dispositivo de entrada' >
      <MidiConfig />
    </FormItem>

    <FormItem label='Quantas notas simultâneas?' >
      <select value={state.config.totalNotes} onChange={ (e) => updateConfig({ 'totalNotes': parseInt(e.target.value) })}>
        <option value={0}>Aleatório</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      { state.config.totalNotes === 0 &&
        <>
          <Hint><strong>1</strong> nota até</Hint>
          <select value={state.config.maxNotes} onChange={ (e) => updateConfig({ 'maxNotes': parseInt(e.target.value) })}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Hint>nota(s).</Hint>
        </>
      }
    </FormItem>

    <FormItem label='Incluir sustenido e bemol?' >
      <Toggle checked={state.config.includeAccidentals} onChange={ (e) => updateConfig({ 'includeAccidentals': e.target.checked })} />
    </FormItem>

    <FormItem label='Notas:' >
      <NotesSelector
        onChange={ (lowerNote, upperNote) => updateConfig({ 'lowerNote': lowerNote, 'upperNote': upperNote })}
      />
    </FormItem>

  </Area>;

};

