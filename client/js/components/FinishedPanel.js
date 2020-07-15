import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';

import { Button, Paragraph, Icon } from 'components/shared';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

const Text = styled(Paragraph)`
  margin-top: 15px;
  font-size: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: stretch;
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  background-color: ${props => props.bgColor};
  flex-basis: 33%;
  justify-content: flex-start;
  align-items: center;
`;

const ScoreHeader = styled(Paragraph)`
  margin-top: 15px;
  font-size: 16px;
  color: #fff;
`;

const ScoreIcon = styled(Icon)`
  margin-top: 20px;
  font-size: 50px;
  color: #fff;
`;

const ScorePoints = styled(Paragraph)`
  margin: 20px 0;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
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

    <Wrapper>

      <Metric bgColor='green'>
        <ScoreHeader>{t('lbl_correct_notes')}</ScoreHeader>
        <ScoreIcon icon={['fas', 'fa-thumbs-up']} />
        <ScorePoints>{state.stats.hits}</ScorePoints>
      </Metric>

      <Metric bgColor='red'>
        <ScoreHeader>{t('lbl_missed_notes')}</ScoreHeader>
        <ScoreIcon icon={['fas', 'fa-times']} />
        <ScorePoints>{state.stats.miss}</ScorePoints>
      </Metric>

      <Metric bgColor='#0091EA'>
        <ScoreHeader>{t('lbl_score')}</ScoreHeader>
        <ScoreIcon icon={['fas', 'fa-star']} />
        <ScorePoints>{state.stats.score}</ScorePoints>
      </Metric>

    </Wrapper>

    <ButtonArea>
      <Button btnSize='lg' btnStyle='primary' label={t('btn_close')} onClick={onClose}/>
    </ButtonArea>

  </FloatingPanel>;

};

