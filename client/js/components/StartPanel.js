import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';
import ConfigArea from 'components/ConfigArea';

import { Context } from 'store';

import { ActionButton } from 'components/shared';

import styled from 'styled-components';

export default () => {

  const [state, dispatch] = useContext(Context);

  const onClose = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
  };

  const onStart = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'running' });
  };

  return <FloatingPanel onClose={onClose} title='Start Exercise'>
    <ConfigArea />
    <ButtonArea>
      <ActionButton size={20} label='Start' onClick={onStart}/>
    </ButtonArea>
  </FloatingPanel>;

};

