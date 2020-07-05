import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';
import ConfigArea from 'components/ConfigArea';
import { useTranslation } from 'react-i18next';
import { Context } from 'store';

import { ActionButton } from 'components/shared';

import styled from 'styled-components';

export default () => {

  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();

  const onClose = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
  };

  const onStart = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'running' });
  };

  return <FloatingPanel onClose={onClose} title={t('lbl_start_exercise')}>
    <ConfigArea />
    <ButtonArea>
      <ActionButton size={20} label={t('btn_start')} onClick={onStart}/>
    </ButtonArea>
  </FloatingPanel>;

};

