import React, { useContext } from 'react';

import { Context } from 'store';
import { useTranslation } from 'react-i18next';
import { Icon, Span, Paragraph } from 'components/shared';

import styled from 'styled-components';

const Board = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 30px;
  border: 3px solid #0096cc;
  border-radius: 10px;
`;

const BadgeLine = styled.div`
  display: flex;
  justify-content: center;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background-color: #0096cc;
  margin: 0 20px;
`;

const Title = styled(Paragraph)`
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 30px;
  padding: 10px 0;
  background-color: #0096cc;
  color: #fff;
  text-align: center;
`;

const GameStatus = styled(Title)`
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 12px;
  padding: 10px;
  background-color: transparent;
  color: #0096cc;
`;

export default () => {

  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();

  return <Board>

    <Title>{t('lbl_results')}</Title>

    <BadgeLine>

      <Badge>
        <Icon icon={['fas', 'fa-thumbs-up']} size={20} color='#fff' right={10}/>
        <Span size={20} color='#fff' bold>{state.stats.hits}</Span>
      </Badge>

      <Badge>
        <Icon icon={['fas', 'fa-times']} size={20} color='#fff' right={10}/>
        <Span size={20} color='#fff' bold>{state.stats.miss}</Span>
      </Badge>

      <Badge>
        <Icon icon={['fas', 'fa-star']} size={20} color='#fff' right={10}/>
        <Span size={20} color='#fff' bold>{state.stats.score}</Span>
      </Badge>

    </BadgeLine>

    <GameStatus>
      { state.stats.status === 'not_started' && t('lbl_exercise_not_started') }
      { state.stats.status === 'in_progress' && t('lbl_exercise_in_progress') }
      { state.stats.status === 'canceled' && t('lbl_exercise_canceled') }
      { state.stats.status === 'completed' && t('lbl_exercise_completed') }
    </GameStatus>

  </Board>;

};

