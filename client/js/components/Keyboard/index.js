import React, { useContext, useState, useEffect } from 'react';

import { Context } from 'store';

import classNames from 'classnames';
import { findMidiNote, addNoteToMidi, removeNoteFromMidi, isSupported } from 'app/utils';
import { Paragraph, Anchor } from 'components/shared';
import { Trans, useTranslation } from 'react-i18next';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: styles.wrapper })``;
const Keyboard = styled.ul.attrs({ className: styles.piano })``;
const KeyGroup = styled.li``;
const WhiteKey = styled.div.attrs(props => ({ className: classNames(styles.anchor, { [styles.active]: props.pressed }) }))``;
const BlackKey = styled.span.attrs(props => ({ className: classNames({ [styles.active]: props.pressed }) }))``;

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

const pianoKeys = [

  { whiteKeyId: 48 },
  { blackKeyId: 49, whiteKeyId: 50 },
  { blackKeyId: 51, whiteKeyId: 52 },
  { whiteKeyId: 53 },
  { blackKeyId: 54, whiteKeyId: 55 },
  { blackKeyId: 56, whiteKeyId: 57 },
  { blackKeyId: 58, whiteKeyId: 59 },

  { whiteKeyId: 60 },
  { blackKeyId: 61, whiteKeyId: 62 },
  { blackKeyId: 63, whiteKeyId: 64 },
  { whiteKeyId: 65 },
  { blackKeyId: 66, whiteKeyId: 67 },
  { blackKeyId: 68, whiteKeyId: 69 },
  { blackKeyId: 70, whiteKeyId: 71 },

  { whiteKeyId: 72 },
  { blackKeyId: 73, whiteKeyId: 74 },
  { blackKeyId: 75, whiteKeyId: 76 },
  { whiteKeyId: 77 },
  { blackKeyId: 78, whiteKeyId: 79 },
  { blackKeyId: 80, whiteKeyId: 81 },
  { blackKeyId: 82, whiteKeyId: 83 },

  { whiteKeyId: 84 },
  { blackKeyId: 85, whiteKeyId: 86 },
  { blackKeyId: 87, whiteKeyId: 88 },
  { whiteKeyId: 89 },
  { blackKeyId: 90, whiteKeyId: 91 },
  { blackKeyId: 92, whiteKeyId: 93 },
  { blackKeyId: 94, whiteKeyId: 95 },

];

export default ({ onOpenSupport }) => {

  const [state, dispatch] = useContext(Context);
  const [keysPressed, setKeysPressed] = useState([]);
  const { t } = useTranslation();

  useEffect(() => setKeysPressed(state.midi.map(midiKey => findMidiNote(midiKey))), [state.midi]);

  const isKeyPressed = key => keysPressed.some(keyPressed => keyPressed === key);

  const onKeyPressed = key => {
    const newNotes = isKeyPressed(key)
      ? removeNoteFromMidi(key.toString(), state.midi)
      : addNoteToMidi(key.toString(), state.midi, state.notes);
    dispatch({ type: 'UPDATE_MIDI', value: newNotes });

  };

  return <Wrapper>
    <Keyboard>
      { pianoKeys.map((key) =>
        <KeyGroup key={key.whiteKeyId}>
          <WhiteKey
            pressed={isKeyPressed(key.whiteKeyId)}
            onClick={() => onKeyPressed(key.whiteKeyId)}
          />
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

