import React, { useContext, useEffect, useCallback } from 'react';

import Clef from 'components/Clef';
import styled from 'styled-components';

import { Context } from 'store';
import { ActionButton, CancelButton } from 'components/shared';

import StartPanel from 'components/StartPanel';
import Countdown from 'components/Countdown';

import { generateRandomNotes } from 'app/utils';

const Content = styled.div`
  width: 960px;
  margin: 30px auto 0 auto;
  text-align: center;
`;

const App = () => {

  const [state, dispatch] = useContext(Context);

  useEffect(() => {

    if (state.status === 'running') {
      const newNotes = generateRandomNotes(state.config);
      dispatch({ type: 'UPDATE_NOTES', value: newNotes });
    };

    if (state.status === 'idle') {
      dispatch({ type: 'UPDATE_NOTES', value: [] });
    };

  }, [state.status]);

  const startSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'configuring' });
  };

  const cancelSequence = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
  };

  return <Content>

    <Clef />

    { state.status === 'running' &&
      <>
        <Countdown />
        <CancelButton size={14} label='Cancelar' onClick={cancelSequence}/>
      </>
    }

    { state.status === 'idle' &&
      <ActionButton size={22} label='Iniciar Sequência...' icon={['fas', 'fa-play-circle']} onClick={startSequence}/>
    }

    { state.status === 'configuring' && <StartPanel /> }

  </Content>;

};

export default App;
