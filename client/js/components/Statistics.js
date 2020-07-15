import React, { useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Icon, Span, Paragraph } from 'components/shared';

import styled from 'styled-components';

const Board = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 33.33%;
  margin-left: 5px;
  padding: 10px;
  background-color: ${props => props.bgColor};
  box-shadow: 1px 1px 1px 0 #ddd;
  border-radius: 3px;

  &:first-child { margin-left: 0; }
`;

const ScoreHeader = styled(Paragraph)`
  font-size: 14px;
  color: #fff;
`;

const ScoreContent = styled.div`
  display: flex;
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

const ScoreIcon = styled(Icon)`
  font-size: 18px;
  color: #fff;
`;

const ScorePoints = styled(Span)`
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

export default () => {

  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();

  return <Board>

    <Badge bgColor='green'>
      <ScoreHeader>{t('lbl_correct_notes')}</ScoreHeader>
      <ScoreContent>
        <ScoreIcon icon={['fas', 'fa-thumbs-up']} />
        <ScorePoints>{state.stats.hits}</ScorePoints>
      </ScoreContent>
    </Badge>

    <Badge bgColor='red'>
      <ScoreHeader>{t('lbl_missed_notes')}</ScoreHeader>
      <ScoreContent>
        <ScoreIcon icon={['fas', 'fa-times']} />
        <ScorePoints>{state.stats.miss}</ScorePoints>
      </ScoreContent>
    </Badge>

    <Badge bgColor='#0091EA'>
      <ScoreHeader>{t('lbl_score')}</ScoreHeader>
      <ScoreContent>
        <ScoreIcon icon={['fas', 'fa-star']} />
        <ScorePoints>{state.stats.score}</ScorePoints>
      </ScoreContent>
    </Badge>

  </Board>;

};

