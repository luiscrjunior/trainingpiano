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
import VirtualPiano from 'components/VirtualPiano';

import { Trans, useTranslation } from 'react-i18next';
import useAnalytics from './useAnalytics';
import useGameLogic from './useGameLogic';
import Footer from './Footer';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 70px;
  background-color: #f2f2f2;
`;

const GamePanel = styled.div`
  display: block;
  width: 867px;
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0 2px 0px #666,
              0 3px 0px #555,
              0 4px 0px #444,
              0 6px 6px #000;
`;

const GameHeader = styled.div`
  display: flex;
  position:relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 867px;
  background:#000;
  background:linear-gradient(-60deg,#000,#333,#000,#666,#333 70%);
  width: 867px;
  left: 0;
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.5),
              inset 0 4px 5px #000;
  border:2px solid #333;
  border-radius: 5px 5px 0 0;
`;

const Logo = styled(Paragraph)`
  margin-left: 10px;
  font-size: 22px;
  color: #f2f2f2;
  font-weight: 300;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 867px;
  background-color: #fff;
  box-shadow: inset 0 0 3px 1px #ddd;
  border: 2px solid #333;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px;
`;

const RightContent = styled.div`
  flex-grow: 1;
`;

const StatisticsRow = styled.div`
`;

const CountdownRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #FFF8E1;
  box-shadow: 1px 1px 1px 0 #ddd;
  margin: 5px 0 0 0;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0 0;
  box-shadow: 1px 1px 1px 0 #ddd;
`;

const WelcomeMessage = styled(Paragraph)`
  padding: 0 30px;
  font-size: 18px;
  font-weight: 300;
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

    <GamePanel>

      <GameHeader>
        <img src='images/piano.png' width={26} />
        <Logo>training<strong>piano</strong></Logo>
      </GameHeader>

      <GameContent>
        <LeftContent>
          <StatisticsRow>
            <Statistics />
          </StatisticsRow>
          <CountdownRow>
            { state.status === 'running'
              ? <Countdown />
              : <WelcomeMessage><Trans i18nKey='msg_welcome'></Trans></WelcomeMessage>
            }
          </CountdownRow>
          <ButtonRow>
            { state.status === 'running' &&
              <CancelButton size={16} label={t('btn_cancel')} onClick={cancelSequence} block/>
            }
            { state.status === 'idle' &&
              <ActionButton size={16} label={t('btn_start_exercise')} icon={['fas', 'fa-play-circle']} block onClick={startSequence}/>
            }
          </ButtonRow>
        </LeftContent>
        <RightContent>
          <Clef />
        </RightContent>
      </GameContent>
      <VirtualPiano onOpenSupport={ () => setShowNotSupportedPanel(true) } />
    </GamePanel>

    <Footer />

    <MidiController />

    { state.status === 'configuring' && <StartPanel /> }

    { showFinishedPanel && <FinishedPanel onClose={resetSequence} /> }

    { showNotSupportedPanel && <NotSupportedPanel onClose={ () => setShowNotSupportedPanel(false) } /> }

  </Page>;

};

export default App;
