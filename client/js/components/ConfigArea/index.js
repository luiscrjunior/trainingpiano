import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'store';

import { FormItem, Span, Toggle } from 'components/shared';

import NotesSelector from './NotesSelector.js';
import { isSupported } from 'app/utils';

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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

    <FormItem label={t('lbl_config_input_device')} >
      <select value={state.config.midiInput ? state.config.midiInput.id : ''} onChange={onSelectMidiInput}>
        <option>{t('lbl_config_choose_device')}</option>
        {midiInputs.map(midiInput => <option key={midiInput.id} value={midiInput.id}>{midiInput.name}</option>)}
      </select>
    </FormItem>

    <FormItem label={t('lbl_config_show_note_names')} >
      <Toggle checked={state.config.showNotesName} onChange={ (e) => updateConfig({ 'showNotesName': e.target.checked })} />
    </FormItem>

    <FormItem label={t('lbl_config_how_many_notes')} >
      <select value={state.config.totalNotes} onChange={ (e) => updateConfig({ 'totalNotes': parseInt(e.target.value) })}>
        <option value={0}>{t('lbl_config_random')}</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      { state.config.totalNotes === 0 &&
        <>
          <Hint><strong>1</strong> {t('lbl_config_note_up_to')}</Hint>
          <select value={state.config.maxNotes} onChange={ (e) => updateConfig({ 'maxNotes': parseInt(e.target.value) })}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Hint>{t('lbl_config_up_to_notes')}.</Hint>
        </>
      }
    </FormItem>

    <FormItem label={t('lbl_config_include_accidentals')} >
      <Toggle checked={state.config.includeAccidentals} onChange={ (e) => updateConfig({ 'includeAccidentals': e.target.checked })} />
    </FormItem>

    <FormItem label={t('lbl_config_notes')} >
      <NotesSelector
        onChange={ (lowerNote, upperNote) => updateConfig({ 'lowerNote': lowerNote, 'upperNote': upperNote })}
      />
    </FormItem>

  </Area>;

};

