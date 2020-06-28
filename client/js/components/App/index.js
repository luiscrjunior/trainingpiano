import React, { useContext, useEffect, useCallback } from 'react';

import Clef from 'components/Clef';
import styled from 'styled-components';

import { Context } from 'store';
import { ActionButton } from 'components/shared';

import StartPanel from 'components/StartPanel';
import Countdown from 'components/Countdown';

const Content = styled.div`
  width: 960px;
  margin: 30px auto 0 auto;
  text-align: center;
`;

const App = () => {

  const [state, dispatch] = useContext(Context);

  const drawAnotherNotes = () => {
    dispatch({ type: 'SHOW_START_PANEL', value: true });
    /* const newNotes = generateRandomNotes(state.config);
    dispatch({ type: 'UPDATE_NOTES', value: newNotes }); */
  };

  return <Content>

    <Clef />

    <Countdown />

    <ActionButton size={22} label='Iniciar Sequência' icon={['fas', 'fa-play-circle']}/>

    { state.showStartPanel && <StartPanel /> }

  </Content>;

};

export default App;
