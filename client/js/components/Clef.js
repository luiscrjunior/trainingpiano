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

    if (!state.notes || state.notes.length === 0) return null;

    const notes = [
      new VF.StaveNote({ clef: 'treble', keys: state.notes, duration: 'w', align_center: true }),
    ];
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    /* apply accidentals automatically */
    Vex.Flow.Accidental.applyAccidentals([voice]);

    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 160);

    group.current = context.current.openGroup();
    voice.draw(context.current, stave.current);
    context.current.closeGroup();

    /* print label */
    printNotesLabel(voice);
  };

  const printNotesLabel = (voice) => {
    /* console.log(voice.getTickables()[0]); */

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
  }, [state.notes]);

  return <div ref={containerRef} />;

};

export default App;
