import React, { useState, useEffect, useCallback } from 'react';
import OctaveButton from './OctaveButton';
import { findMidiNote } from 'app/utils';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const Selector = styled.div``;

const allOctaves = [
  { number: '1', lower: 'C/1', upper: 'B/1', selected: false },
  { number: '2', lower: 'C/2', upper: 'B/2', selected: false },
  { number: '3', lower: 'C/3', upper: 'B/3', selected: false },
  { number: '4', lower: 'C/4', upper: 'B/4', selected: false },
  { number: '5', lower: 'C/5', upper: 'B/5', selected: false },
  { number: '6', lower: 'C/6', upper: 'B/6', selected: false },
];

const OctavesSelector = ({ onChange }) => {
  const lowerNote = useSelector((state) => state.config.lowerNote);
  const upperNote = useSelector((state) => state.config.upperNote);
  const clef = useSelector((state) => state.config.clef);
  const [octaves, setOctaves] = useState([]);

  /* each time notes offset change, update octave buttons */
  useEffect(() => {
    updateOctaves();
  }, [lowerNote, upperNote, updateOctaves]);

  useEffect(() => {
    /* reset available octaves each time clef changes */
    const availableClefs =
      clef === 'treble' ? ['3', '4', '5', '6'] : ['1', '2', '3', '4'];
    setOctaves(
      allOctaves
        .filter((octave) => availableClefs.includes(octave.number))
        .map((octave) => ({ ...octave, selected: isSelected(octave) }))
    );
    onChange(`C/${availableClefs[1]}`, `B/${availableClefs[2]}`);
  }, [clef, isSelected, onChange]);

  const isSelected = useCallback(
    (note) =>
      findMidiNote(note.lower) >= findMidiNote(lowerNote) &&
      findMidiNote(note.upper) <= findMidiNote(upperNote),
    [lowerNote, upperNote]
  );

  const updateOctaves = useCallback(() => {
    setOctaves(
      octaves.map((octave) => ({ ...octave, selected: isSelected(octave) }))
    );
  }, [isSelected, octaves]);

  const onClick = (idx) => {
    if (!onChange) return;
    const newOctaves = JSON.parse(JSON.stringify(octaves)); /* deep clone */
    newOctaves[idx].selected = !newOctaves[idx].selected;
    const isAdding = newOctaves[idx].selected;
    let lower, upper;
    const firstSelectedIdx = newOctaves.findIndex((note) => note.selected);
    if (firstSelectedIdx === -1) return; /* no octave selected */
    lower = newOctaves[firstSelectedIdx].lower;
    if (!isAdding) {
      /* is removing octave */
      for (let i = firstSelectedIdx; i < newOctaves.length; i++) {
        if (newOctaves[i].selected) {
          upper = newOctaves[i].upper;
        } else {
          break;
        }
      }
    } else {
      /* is adding octave */
      upper = [...newOctaves].reverse().find((octave) => octave.selected).upper;
    }
    onChange(lower, upper);
  };

  return (
    <Selector>
      {octaves &&
        octaves.map((octave, idx) => (
          <OctaveButton
            key={octave.lower}
            lower={octave.lower}
            upper={octave.upper}
            selected={octave.selected}
            onClick={onClick.bind(this, idx)}
          />
        ))}
    </Selector>
  );
};

export default OctavesSelector;
