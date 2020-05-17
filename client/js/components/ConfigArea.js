import React, { useContext } from 'react';

import MidiConfig from 'components/MidiConfig';
import { Context } from 'store';

import { FormItem, Span, Toggle } from 'components/shared';

import styled from 'styled-components';

const Area = styled.div`
  margin-top: 30px;
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
`;

const Hint = styled(Span)`
  margin-left: 10px;
  font-size: 11px;
`;

export default () => {

  const [state, dispatch] = useContext(Context);

  const updateConfig = (item, value) => {
    dispatch({ type: 'UPDATE_CONFIG', value: { [item]: value } });
  };

  return <Area>

    <FormItem label='Dispositivo de entrada' >
      <MidiConfig />
    </FormItem>

    <FormItem label='Quantas notas simultâneas?' >
      <input value={state.config.totalNotes} onChange={ (e) => updateConfig('totalNotes', parseInt(e.target.value))} />
      <Hint>0 significa aleatório (de 1 até o número máximo de notas)</Hint>
    </FormItem>

    <FormItem label='Número máximo de notas (se aleatório)' >
      <input value={state.config.maxNotes} onChange={ (e) => updateConfig('maxNotes', parseInt(e.target.value))} />
    </FormItem>

    <FormItem label='Incluir sustenido e bemol?' >
      <Toggle checked={state.config.includeAccidentals} onChange={ (e) => updateConfig('includeAccidentals', e.target.checked)} />
    </FormItem>

    <FormItem label='Nota mais baixa:' >
      <input value={state.config.lowerNote} onChange={ (e) => updateConfig('lowerNote', e.target.value)} />
    </FormItem>

    <FormItem label='Nota mais alta:' >
      <input value={state.config.upperNote} onChange={ (e) => updateConfig('upperNote', e.target.value)} />
    </FormItem>

  </Area>;

};

