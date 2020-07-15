import React, { useContext, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames';
import { findMidiNote, addNoteToMidi, removeNoteFromMidi, isSupported, findNotes } from 'app/utils';
import { Paragraph, Anchor } from 'components/shared';
import { Trans, useTranslation } from 'react-i18next';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: styles.wrapper })``;
const Keyboard = styled.ul.attrs({ className: styles.piano })``;
const KeyGroup = styled.li``;
const WhiteKey = styled.div.attrs(props => ({ className: classNames(styles.whiteKey, { [styles.active]: props.pressed }) }))``;
const BlackKey = styled.span.attrs(props => ({ className: classNames(styles.blackKey, { [styles.active]: props.pressed }) }))``;
const KeyLabel = styled.span.attrs(props => ({ className: styles.keyLabel }))``;

const Label = styled(Paragraph)`
  color: #f2f2f2;
  text-align: center;
  margin: 15px 0 5px 0;
  font-size: 11px;
`;

const Link = styled(Anchor)`
  color: #fff;
  text-decoration: underline;
  font-size: 11px;

  &:link, &:visited, &:hover, &:active {
    text-decoration: underline;
  }
`;

import styles from './styles.scss';

const createPianoKeys = (lower, upper) => {
  const lowerMidi = findMidiNote(lower);
  const upperMidi = findMidiNote(upper);
  const pianoKeys = [];
  for (let midi = lowerMidi; midi <= upperMidi;) {
    pianoKeys.push(
      { whiteKeyId: midi },
      { blackKeyId: ++midi, whiteKeyId: ++midi },
      { blackKeyId: ++midi, whiteKeyId: ++midi },
      { whiteKeyId: ++midi },
      { blackKeyId: ++midi, whiteKeyId: ++midi },
      { blackKeyId: ++midi, whiteKeyId: ++midi },
      { blackKeyId: ++midi, whiteKeyId: ++midi },
    );
    midi++;
  }
  return pianoKeys;
};

export default ({ onOpenSupport }) => {

  const [state, dispatch] = useContext(Context);
  const [keysPressed, setKeysPressed] = useState([]);
  const [pianoKeys, setPianoKeys] = useState([]);
  const { t } = useTranslation();

  useEffect(() => setKeysPressed(state.midi.map(midiKey => findMidiNote(midiKey))), [state.midi]);

  const isKeyPressed = key => keysPressed.some(keyPressed => keyPressed === key);

  const onKeyPressed = key => {
    const newNotes = isKeyPressed(key)
      ? removeNoteFromMidi(key.toString(), state.midi)
      : addNoteToMidi(key.toString(), state.midi, state.notes);
    dispatch({ type: 'UPDATE_MIDI', value: newNotes });

  };

  useEffect(() => {
    const [lower, upper] = state.config.clef === 'treble'
      ? ['C/3', 'B/6']
      : ['C/1', 'B/4'];
    setPianoKeys(createPianoKeys(lower, upper));
  }, [state.config.clef]);

  return <Wrapper>
    <Keyboard>
      { pianoKeys.map((key, idx) =>
        <KeyGroup key={key.whiteKeyId}>
          <WhiteKey
            pressed={isKeyPressed(key.whiteKeyId)}
            onClick={() => onKeyPressed(key.whiteKeyId)}
          >
            { (idx === 0 || idx === pianoKeys.length - 1) &&
              <KeyLabel>{findNotes(key.whiteKeyId)}</KeyLabel>
            }
          </WhiteKey>
          {key.blackKeyId &&
            <BlackKey
              pressed={isKeyPressed(key.blackKeyId)}
              onClick={() => onKeyPressed(key.blackKeyId)}
            />}
        </KeyGroup>
      )}
    </Keyboard>
    <Label>
      { state.config.midiInput
        ? state.config.midiInput.name
        : isSupported()
          ? <Trans i18nKey='piano_msg_supported'></Trans>
          : <Trans i18nKey='piano_msg_unsupported'>Infelizmente, seu navegador não <Link onClick={onOpenSupport}>suporta</Link> acesso aos dispositivos MIDI's, mas você poderá usar esse piano virtual.</Trans>
      }
    </Label>
  </Wrapper>;

};

