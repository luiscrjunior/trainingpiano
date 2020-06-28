import React, { useContext, useEffect, useCallback } from 'react';

import Clef from 'components/Clef';
import styled from 'styled-components';

import { Context } from 'store';
import { Paragraph, Button } from 'components/shared';

import { generateRandomNotes } from 'app/utils';
import StartPanel from 'components/StartPanel';

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

    <Button btnStyle='primary' btnSize='lg' label='Iniciar Sequência' onClick={drawAnotherNotes}/>

    { state.showStartPanel && <StartPanel /> }

  </Content>;

};

export default App;
