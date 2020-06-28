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
    dispatch({ type: 'SHOW_START_PANEL', value: false });
  };

  return <FloatingPanel onClose={onClose} title='Iniciar Sequência'>
    <ConfigArea />
    <ButtonArea>
      <ActionButton size={20} label='Iniciar' icon={['fas', 'fa-play-circle']} />
    </ButtonArea>
  </FloatingPanel>;

};

