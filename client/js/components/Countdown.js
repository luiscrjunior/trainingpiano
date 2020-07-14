import React, { useContext, useEffect, useState } from 'react';

import Countdown from 'react-countdown';
import { Span, Icon } from 'components/shared';

import { Context } from 'store';

import styled from 'styled-components';

const Area = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountdownLabel = styled(Span)`
  font-size: 70px;
  color: #424242;
  font-weight: 300;
  letter-spacing: -3px;
`;

export default () => {

  const [state, dispatch] = useContext(Context);
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    setDate(Date.now() + 30000);
  }, []);

  const onComplete = () => {
    dispatch({ type: 'UPDATE_STATUS', value: 'idle' });
    dispatch({ type: 'UPDATE_STATS', value: { status: 'completed' } });
  };

  const renderer = ({ formatted: { minutes, seconds }, completed }) => {
    return <CountdownLabel>{minutes}:{seconds}</CountdownLabel>;
  };

  return <Area>
    <Countdown
      autoStart={true}
      date={date}
      renderer={renderer}
      onComplete={onComplete}
    />
  </Area>;

};

