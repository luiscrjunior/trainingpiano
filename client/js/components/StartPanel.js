import React, { useContext } from 'react';

import FloatingPanel from 'components/FloatingPanel';
import ConfigArea from 'components/ConfigArea';

import { Context } from 'store';

import { ActionButton } from 'components/shared';

import styled from 'styled-components';

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export default () => {

  const [state, dispatch] = useContext(Context);

  const onClose = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
  };

  const onStart = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'running' });
  };

  return <FloatingPanel onClose={onClose} title='Iniciar Teste'>
    <ConfigArea />
    <ButtonArea>
      <ActionButton size={20} label='Iniciar' onClick={onStart}/>
    </ButtonArea>
  </FloatingPanel>;

};

