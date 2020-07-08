import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';

import { Button, Paragraph } from 'components/shared';

import { useTranslation } from 'react-i18next';
import { Context } from 'store';

import styled from 'styled-components';

const Text = styled(Paragraph)`
  margin-top: 15px;
  font-size: 16px;
`;

export default ({ onClose }) => {

  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();

  let title;
  switch (state.stats.status) {
  case 'completed':
    title = t('lbl_finished');
    break;
  case 'canceled':
    title = t('lbl_canceled');
    break;
  default:
    title = t('lbl_finished');
  }

  return <FloatingPanel onClose={onClose} title={title}>

    <Text>
      <strong>{t('lbl_correct_notes')}: </strong>{state.stats.hits}
    </Text>

    <Text>
      <strong>{t('lbl_missed_notes')}: </strong>{state.stats.miss}
    </Text>

    <Text>
      <strong>{t('lbl_score')}: </strong>{state.stats.score}
    </Text>

    <ButtonArea>
      <Button btnSize='lg' btnStyle='primary' label={t('btn_close')} onClick={onClose}/>
    </ButtonArea>

  </FloatingPanel>;

};

