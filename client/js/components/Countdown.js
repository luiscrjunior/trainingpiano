import React, { useContext } from 'react';

import Countdown from 'react-countdown';
import { Span, Icon } from 'components/shared';

import { Context } from 'store';

import styled from 'styled-components';

const Area = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CountdownLabel = styled(Span)`
  font-size: 60px;
  color: #0096cc;
  font-weight: 300;
`;

export default () => {

  const [state, dispatch] = useContext(Context);

  const onComplete = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
    dispatch({ type: 'UPDATE_STATS', value: { status: 'completed' } });
  };

  const renderer = ({ formatted: { minutes, seconds }, completed }) => {
    return <CountdownLabel>{minutes}:{seconds}</CountdownLabel>;
  };

  return <Area>
    <Icon icon={['fas', 'fa-clock']} size={30} color='#0096cc' right={15} />
    <Countdown
      date={Date.now() + 6000}
      renderer={renderer}
      onComplete={onComplete}
    />
  </Area>;

};

