import React, { useRef, useContext, useEffect } from 'react';
import Vex from 'vexflow';
import { translateNote, notesThatMatch } from 'app/utils';

import { useTranslation } from 'react-i18next';
import { Context } from 'store';

import styled from 'styled-components';

const Container = styled.div``;

const VF = Vex.Flow;

const App = () => {

  const [state, dispatch] = useContext(Context);
  const containerRef = useRef();
  let context = useRef(null);
  let stave = useRef(null);
  let group = useRef(null);
  const { t } = useTranslation();

  const renderContainer = () => {
    const renderer = new VF.Renderer(containerRef.current, VF.Renderer.Backends.SVG);
    renderer.resize(550, 330);
    context.current = renderer.getContext();
    context.current.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    context.current.scale(2, 2); //zoom
  };

  const renderStave = () => {
    if (stave.current) {
      context.current.clear();
      if (group.current) group.current = null;
    }
    stave.current = new VF.Stave(30, 20, 210);
    stave.current.addClef(state.config.clef);
    stave.current.setContext(context.current);
    stave.current.draw();
  };

  const drawGhostNotes = (hit, groupToClone) => {
    const clonedGroup = groupToClone.cloneNode(true);
    group.current.parentNode.appendChild(clonedGroup);
    clonedGroup.classList.add('ghost_notes', hit ? 'hit' : 'miss');
    clonedGroup.addEventListener('animationend', e => e.target.remove());
  };

  const renderNotes = () => {

    if (!stave.current || !context.current) return null;

    if (group.current) {
      context.current.svg.removeChild(group.current);
      group.current = null;
    }

    let voiceNotes = null;
    let voiceMidi = null;
    const matchNotes = notesThatMatch(state.midi, state.notes);

    /* random notes */
    if (state.notes && state.notes.length > 0) {
      voiceNotes = new VF.Voice({ num_beats: 4, beat_value: 4 });
      const notes = [
        new VF.StaveNote({ clef: state.config.clef, keys: state.notes, duration: 'w', align_center: true }),
      ];
      voiceNotes.addTickables(notes);
    }

    /* midi notes */
    if (state.midi && state.midi.length > 0) {
      voiceMidi = new VF.Voice({ num_beats: 4, beat_value: 4 });
      const midiStaveNote = new VF.StaveNote({ clef: state.config.clef, keys: state.midi, duration: 'w', align_center: true });
      midiStaveNote.setStyle({ fillStyle: '#aaa' });
      matchNotes.forEach(matchNoteIdx => {
        midiStaveNote.setKeyStyle(matchNoteIdx, { fillStyle: 'green' });
      });
      const notes = [midiStaveNote];
      voiceMidi.addTickables(notes);
    }

    /* apply accidentals automatically (individually) */
    if (voiceNotes) Vex.Flow.Accidental.applyAccidentals([voiceNotes]);
    if (voiceMidi) Vex.Flow.Accidental.applyAccidentals([voiceMidi]);

    /* format each voice individually to overlap them */
    if (voiceNotes) new VF.Formatter().joinVoices([voiceNotes]).format([voiceNotes], 130);
    if (voiceMidi) new VF.Formatter().joinVoices([voiceMidi]).format([voiceMidi], 130);

    group.current = context.current.openGroup();
    if (voiceNotes) voiceNotes.draw(context.current, stave.current);
    if (voiceMidi) voiceMidi.draw(context.current, stave.current);
    context.current.closeGroup();

    /* print label */
    if (voiceNotes && state.config.showNotesName) printNotesLabel(voiceNotes);

    /* print ghost notes to be animated */
    if (state.userHasScored()) {
      drawGhostNotes(true, voiceNotes.getTickables()[0].attrs.el);
    } else if (state.userHasMissed()) {
      drawGhostNotes(false, voiceNotes.getTickables()[0].attrs.el);
    }
  };

  const printNotesLabel = (voice) => {

    const staveNote = voice.getTickables()[0];
    const notes = staveNote.keys.map(item => ({ key: item }));

    staveNote.note_heads.forEach((noteHead, idx) => {
      notes[idx].x = noteHead.x;
      notes[idx].y = noteHead.y;
    });

    notes.forEach(note => {
      const svgNS = 'http://www.w3.org/2000/svg';
      const newText = document.createElementNS(svgNS, 'text');
      newText.setAttributeNS(null, 'x', 245);
      newText.setAttributeNS(null, 'y', note.y + 3);
      newText.setAttributeNS(null, 'font-size', '8');
      const textNode = document.createTextNode(translateNote(note.key, t('notes')));
      newText.appendChild(textNode);
      group.current.appendChild(newText);
    });

  };

  useEffect(() => {
    renderContainer();
  }, []);

  useEffect(() => {
    renderStave();
  }, [state.config.clef]);

  useEffect(() => {
    renderNotes();
  }, [state.notes, state.midi]);

  return <Container ref={containerRef} />;

};

export default App;
