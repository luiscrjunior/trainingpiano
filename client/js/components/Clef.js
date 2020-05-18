import React, { useRef, useContext, useEffect } from 'react';
import Vex, { drawDot } from 'vexflow';
import { translateNote } from 'app/utils';
import styled from 'styled-components';

import { Context } from 'store';

const VF = Vex.Flow;

const App = () => {

  const [state, dispatch] = useContext(Context);
  const containerRef = useRef();
  let context = useRef();
  let stave = useRef();
  let group = useRef();

  const renderStave = () => {

    const renderer = new VF.Renderer(containerRef.current, VF.Renderer.Backends.SVG);
    renderer.resize(460, 360);
    context.current = renderer.getContext();
    context.current.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    // Create a stave of width 400 at position 10, 40 on the canvas.
    stave.current = new VF.Stave(0, 30, 200);

    // Add a clef and time signature.
    stave.current.addClef('treble');

    context.current.scale(2, 2); //size

    // Connect it to the rendering context and draw!
    stave.current.setContext(context.current).draw();

  };

  const renderNotes = () => {

    if (!stave.current || !context.current) return null;

    if (group.current) {
      context.current.svg.removeChild(group.current);
      group.current = null;
    }

    let voiceNotes = null;
    let voiceMidi = null;

    /* random notes */
    if (state.notes && state.notes.length > 0) {
      voiceNotes = new VF.Voice({ num_beats: 4, beat_value: 4 });
      const notes = [
        new VF.StaveNote({ clef: 'treble', keys: state.notes, duration: 'w', align_center: true }),
      ];
      voiceNotes.addTickables(notes);
    }

    /* midi notes */
    if (state.midi && state.midi.length > 0) {
      voiceMidi = new VF.Voice({ num_beats: 4, beat_value: 4 });
      const midiStaveNote = new VF.StaveNote({ clef: 'treble', keys: state.midi, duration: 'w', align_center: true });
      midiStaveNote.setStyle({ fillStyle: '#aaa' });
      const notes = [midiStaveNote];
      voiceMidi.addTickables(notes);
    }

    /* apply accidentals automatically (individually) */
    if (voiceNotes) Vex.Flow.Accidental.applyAccidentals([voiceNotes]);
    if (voiceMidi) Vex.Flow.Accidental.applyAccidentals([voiceMidi]);

    /* format each voice individually to overlap them */
    if (voiceNotes) new VF.Formatter().joinVoices([voiceNotes]).format([voiceNotes], 160);
    if (voiceMidi) new VF.Formatter().joinVoices([voiceMidi]).format([voiceMidi], 160);

    group.current = context.current.openGroup();
    if (voiceNotes) voiceNotes.draw(context.current, stave.current);
    if (voiceMidi) voiceMidi.draw(context.current, stave.current);
    context.current.closeGroup();

    /* print label */
    if (voiceNotes) printNotesLabel(voiceNotes);
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
      newText.setAttributeNS(null, 'x', 205);
      newText.setAttributeNS(null, 'y', note.y + 3);
      newText.setAttributeNS(null, 'font-size', '8');
      const textNode = document.createTextNode(translateNote(note.key));
      newText.appendChild(textNode);
      group.current.appendChild(newText);
    });

  };

  useEffect(() => {
    renderStave();
  }, []);

  useEffect(() => {
    renderNotes();
  }, [state.notes, state.midi]);

  return <div ref={containerRef} />;

};

export default App;
