import React, { useContext, useState } from 'react';

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
import Keyboard from 'components/Keyboard';
import ShareBar from 'components/ShareBar';

import { Trans, useTranslation } from 'react-i18next';
import useAnalytics from './useAnalytics';
import useGameLogic from './useGameLogic';

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
  align-items: center;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 380px;
  padding-top: 80px;
`;

const App = () => {

  const [state, dispatch] = useContext(Context);
  const [showNotSupportedPanel, setShowNotSupportedPanel] = useState(false);
  const { t } = useTranslation();
  const { setupAnalytics, trackEvent } = useAnalytics();
  const [startSequence, cancelSequence, resetSequence, showFinishedPanel] = useGameLogic();

  /* setup Google Analytics and Facebook Pixel */
  setupAnalytics();

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

    <Section><Keyboard onOpenSupport={ () => setShowNotSupportedPanel(true) } /></Section>

    <Section><Paragraph size={14}><em><Trans i18nKey='msg_footer'>Still in <strong>beta</strong>. Soon, we will add F Clef, user ranking and other features... Feedback? <a href='mailto:contact@trainingpiano.com'>contact@trainingpiano.com</a></Trans></em></Paragraph></Section>

    <Section><LanguageSelector /></Section>

    <Section><ShareBar /></Section>

    <MidiController />

    { showFinishedPanel && <FinishedPanel onClose={resetSequence} /> }

    { showNotSupportedPanel && <NotSupportedPanel onClose={ () => setShowNotSupportedPanel(false) } /> }

  </Page>;

};

export default App;
