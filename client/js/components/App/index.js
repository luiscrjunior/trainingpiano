import React, { useContext, useEffect, useState } from 'react';

import Clef from 'components/Clef';
import styled from 'styled-components';

import { Context } from 'store';
import { ActionButton, CancelButton, Paragraph } from 'components/shared';

import StartPanel from 'components/StartPanel';
import NotSupportedPanel from 'components/NotSupportedPanel';
import FinishedPanel from 'components/FinishedPanel';
import Countdown from 'components/Countdown';
import Statistics from 'components/Statistics';
import MidiController from 'components/MidiController';
import LanguageSelector from 'components/LanguageSelector';

import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import { Trans, useTranslation } from 'react-i18next';

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
  position: relative;
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
  const [showNotSupportedPanel, setShowNotSupportedPanel] = useState(!isSupported());
  const [showFinishedPanel, setShowFinishedPanel] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {

    if (state.status === 'running') {
      const newNotes = generateRandomNotes(state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
      dispatch({ type: 'UPDATE_STATS', value: { hits: 0, score: 0, status: 'in_progress' } });
    };

    if (state.status === 'idle') {
      dispatch({ type: 'UPDATE_NOTES', value: [] });
      if (state.stats.status === 'canceled' || state.stats.status === 'completed') setShowFinishedPanel(true);
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

  /* initialize Google Analytics and Facebook Pixel */
  useEffect(() => {
    ReactGA.initialize('UA-171111912-1');
    ReactGA.pageview('/');

    ReactPixel.init('1475213622668870');
    ReactPixel.pageView();

    if (!isSupported()) {
      ReactGA.event({ category: 'App', action: 'Unsupported Browser', nonInteraction: true });
      ReactPixel.trackCustom('Unsupported Browser');
    }

  }, []);

  const startSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'configuring' });
  };

  const cancelSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
    dispatch({ type: 'UPDATE_STATS', value: { status: 'canceled' } });
  };

  const resetSequence = () => {
    ReactGA.event({ category: 'App', action: `Exercise ${state.stats.status}`, nonInteraction: false, value: state.stats.score });
    ReactPixel.trackCustom(`Exercise ${state.stats.status}`, state.stats);
    dispatch({ type: 'UPDATE_STATS', value: { hits: 0, score: 0, status: 'not_started' } });
    setShowFinishedPanel(false);
  };

  return <Page>

    <Section><img src='images/logo_full.png' width='300px'/></Section>

    <Section><Paragraph size={14}><em><Trans i18nKey='msg_header'>Plug your MIDI keyboard/piano and improve your skills hitting the correct notes.</Trans></em></Paragraph></Section>

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
            <CancelButton size={14} label={t('btn_cancel')} onClick={cancelSequence}/>
          </>
        }

        { state.status === 'idle' &&
          <ActionButton size={22} label={t('btn_start_exercise')} icon={['fas', 'fa-play-circle']} block onClick={startSequence}/>
        }

      </RightCol>
    </Section>

    { state.status === 'configuring' && <StartPanel /> }

    <Section><Paragraph size={14}><em><Trans i18nKey='msg_footer'>Still in <strong>beta</strong>. Soon, we will add F Clef, user ranking and other features... Feedback? <a href='mailto:contact@trainingpiano.com'>contact@trainingpiano.com</a></Trans></em></Paragraph></Section>

    <Section><LanguageSelector /></Section>

    <MidiController />


    { showFinishedPanel && <FinishedPanel onClose={resetSequence} /> }

    { showNotSupportedPanel && <NotSupportedPanel onClose={ () => setShowNotSupportedPanel(false) } /> }

  </Page>;

};

export default App;
