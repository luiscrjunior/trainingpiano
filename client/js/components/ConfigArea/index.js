import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormItem, Span, Toggle } from 'components/shared';

import OctavesSelector from './OctavesSelector.js';
import { isSupported } from 'app/utils';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const Area = styled.div``;

const Hint = styled(Span)`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 11px;
`;

const ConfigArea = () => {
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [midiInputs, setMidiInputs] = useState([]);
  const { t } = useTranslation();

  const updateConfig = useCallback(
    (item) => {
      dispatch({ type: 'UPDATE_CONFIG', value: item });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isSupported()) return;
    navigator.requestMIDIAccess().then((access) => {
      const inputs = access.inputs.values();
      setMidiInputs(Array.from(inputs));
    });
  }, []);

  const selectMidiInput = (inputId) => {
    const inputToSelect =
      midiInputs.find((input) => input.id === inputId) || null;
    updateConfig({ midiInput: inputToSelect });
  };

  const onSelectMidiInput = (e) => selectMidiInput(e.target.value);

  const updateNoteRange = useCallback(
    (lowerNote, upperNote) =>
      updateConfig({ lowerNote: lowerNote, upperNote: upperNote }),
    [updateConfig]
  );

  return (
    <Area>
      <FormItem label={t('lbl_config_input_device')}>
        <select
          value={config.midiInput ? config.midiInput.id : ''}
          onChange={onSelectMidiInput}
        >
          <option>{t('lbl_config_choose_device')}</option>
          {midiInputs.map((midiInput) => (
            <option key={midiInput.id} value={midiInput.id}>
              {midiInput.name}
            </option>
          ))}
        </select>
      </FormItem>

      <FormItem label={t('lbl_config_clef')}>
        <select
          value={config.clef}
          onChange={(e) => updateConfig({ clef: e.target.value })}
        >
          <option value="treble">{t('lbl_config_clef_treble')}</option>
          <option value="bass">{t('lbl_config_clef_bass')}</option>
        </select>
      </FormItem>

      <FormItem label={t('lbl_config_show_note_names')}>
        <Toggle
          checked={config.showNotesName}
          onChange={(e) => updateConfig({ showNotesName: e.target.checked })}
        />
      </FormItem>

      <FormItem label={t('lbl_config_how_many_notes')}>
        <select
          value={config.totalNotes}
          onChange={(e) =>
            updateConfig({ totalNotes: parseInt(e.target.value) })
          }
        >
          <option value={0}>{t('lbl_config_random')}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {config.totalNotes === 0 && (
          <>
            <Hint>
              <strong>1</strong> {t('lbl_config_note_up_to')}
            </Hint>
            <select
              value={config.maxNotes}
              onChange={(e) =>
                updateConfig({ maxNotes: parseInt(e.target.value) })
              }
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <Hint>{t('lbl_config_up_to_notes')}.</Hint>
          </>
        )}
      </FormItem>

      <FormItem label={t('lbl_config_include_accidentals')}>
        <Toggle
          checked={config.includeAccidentals}
          onChange={(e) =>
            updateConfig({ includeAccidentals: e.target.checked })
          }
        />
      </FormItem>

      <FormItem label={t('lbl_config_notes')}>
        <OctavesSelector onChange={updateNoteRange} />
      </FormItem>
    </Area>
  );
};

export default ConfigArea;
