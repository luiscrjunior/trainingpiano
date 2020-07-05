import React, { useContext, useEffect, useState } from 'react';

import Clef from 'components/Clef';
import styled from 'styled-components';

import { Context } from 'store';
import { ActionButton, CancelButton, Paragraph } from 'components/shared';

import StartPanel from 'components/StartPanel';
import NotSupportedPanel from 'components/NotSupportedPanel';
import Countdown from 'components/Countdown';
import Statistics from 'components/Statistics';
import MidiController from 'components/MidiController';

import { isSupported, generateRandomNotes, notesThatMatch, getNotesScore } from 'app/utils';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  width: 960px;
  justify-content: center;
  margin-bottom: 15px;
`;

const LeftCol = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  padding-top: 80px;
`;

const App = () => {

  const [state, dispatch] = useContext(Context);
  const [showNotSupportedPanel, setShowNotSupportedPanel] = useState(true);

  useEffect(() => {

    if (state.status === 'running') {
      const newNotes = generateRandomNotes(state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_STATS', value: { times: 1, hits: 0, score: 0, status: 'in_progress' } });
    };

    if (state.status === 'idle') {
      dispatch({ type: 'UPDATE_NOTES', value: [] });
    };

  }, [state.status]);

  useEffect(() => {

    const matchNotes = notesThatMatch(state.midi, state.notes);
    if (state.status === 'running' && state.notes.length > 0 && matchNotes.length === state.notes.length) { /* notes matched: hit */
      const newNotes = generateRandomNotes(state.config);
      const score = getNotesScore(state.notes, state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_MIDI', value: [] });
      dispatch({ type: 'UPDATE_STATS', value: { hits: state.stats.hits + 1, score: state.stats.score + score } });
    }

  }, [state.midi]);

  const startSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'configuring' });
  };

  const cancelSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
    dispatch({ type: 'UPDATE_STATS', value: { status: 'canceled' } });
  };

  return <Page>

    <Section><img src='images/logo_full.png' width='300px'/></Section>

    <Section><Paragraph size={14}><em>Plug your MIDI keyboard/piano and improve your skills hitting the correct notes.</em></Paragraph></Section>

    <Section>
      <LeftCol>
        <Clef />
      </LeftCol>

      <RightCol>

        { (state.status === 'idle' || state.status === 'running') &&
          <Statistics />
        }

        { state.status === 'running' &&
          <>
            <Countdown />
            <CancelButton size={14} label='Cancelar' onClick={cancelSequence}/>
          </>
        }

        { state.status === 'idle' &&
          <ActionButton size={22} label='Start exercise...' icon={['fas', 'fa-play-circle']} block onClick={startSequence}/>
        }

      </RightCol>
    </Section>

    { state.status === 'configuring' && <StartPanel /> }

    <Section><Paragraph size={14}><em>Still in <strong>beta</strong>. Soon, we will add F Clef, user ranking and other features... Feedback? <a href='mailto:contact@trainingpiano.com'>contact@trainingpiano.com</a></em></Paragraph></Section>

    <MidiController />

    { !isSupported() && showNotSupportedPanel && <NotSupportedPanel onClose={ () => setShowNotSupportedPanel(false) } /> }

  </Page>;

};

export default App;
