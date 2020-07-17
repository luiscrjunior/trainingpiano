import React, { useState } from 'react';

import Clef from 'components/Clef';
import { useSelector } from 'react-redux';
import { ActionButton, CancelButton } from 'components/shared';

import StartPanel from 'components/StartPanel';
import NotSupportedPanel from 'components/NotSupportedPanel';
import FinishedPanel from 'components/FinishedPanel';
import Countdown from 'components/Countdown';
import Statistics from 'components/Statistics';
import MidiController from 'components/MidiController';
import VirtualPiano from 'components/VirtualPiano';

import { Trans, useTranslation } from 'react-i18next';
import useAnalytics from './useAnalytics';
import useExercise from './useExercise';
import Footer from './Footer';

import {
  Page,
  GamePanel,
  GameHeader,
  GameContent,
  StatisticsRow,
  CountdownRow,
  ButtonRow,
  WelcomeMessage,
  LeftContent,
  RightContent,
  Logo,
} from './styles';

const App = () => {
  const status = useSelector((state) => state.status);
  const showFinishedPanel = useSelector((state) => state.showFinishedPanel);
  const [showNotSupportedPanel, setShowNotSupportedPanel] = useState(false);
  const { t } = useTranslation();
  const [
    configureExercise,
    cancelExercise,
    finishExercise,
    resetExercise,
  ] = useExercise();
  useAnalytics({ setup: true, pageView: true });

  return (
    <Page>
      <GamePanel>
        <GameHeader>
          <img src="images/piano.png" width={26} />
          <Logo>
            training<strong>piano</strong>
          </Logo>
        </GameHeader>

        <GameContent>
          <LeftContent>
            <StatisticsRow>
              <Statistics />
            </StatisticsRow>
            <CountdownRow>
              {status === 'running' ? (
                <Countdown onCountdown={finishExercise} />
              ) : (
                <WelcomeMessage>
                  <Trans i18nKey="msg_welcome"></Trans>
                </WelcomeMessage>
              )}
            </CountdownRow>
            <ButtonRow>
              {status === 'running' && (
                <CancelButton
                  size={16}
                  label={t('btn_cancel')}
                  onClick={cancelExercise}
                  block
                />
              )}
              {status === 'idle' && (
                <ActionButton
                  size={16}
                  label={t('btn_start_exercise')}
                  icon={['fas', 'fa-play-circle']}
                  block
                  onClick={configureExercise}
                />
              )}
            </ButtonRow>
          </LeftContent>
          <RightContent>
            <Clef />
          </RightContent>
        </GameContent>
        <VirtualPiano onOpenSupport={() => setShowNotSupportedPanel(true)} />
      </GamePanel>

      <Footer />

      <MidiController />

      {status === 'configuring' && <StartPanel />}

      {showFinishedPanel && <FinishedPanel onClose={resetExercise} />}

      {showNotSupportedPanel && (
        <NotSupportedPanel onClose={() => setShowNotSupportedPanel(false)} />
      )}
    </Page>
  );
};

export default App;
