import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';
import ConfigArea from 'components/ConfigArea';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { ActionButton } from 'components/shared';

export default () => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    dispatch({ type: 'RESET_EXERCISE' });
  };

  const onStart = () => {
    dispatch({ type: 'START_EXERCISE' });
  };

  return <FloatingPanel onClose={onClose} title={t('lbl_start_exercise')}>
    <ConfigArea />
    <ButtonArea>
      <ActionButton size={16} label={t('btn_start')} onClick={onStart}/>
    </ButtonArea>
  </FloatingPanel>;

};

