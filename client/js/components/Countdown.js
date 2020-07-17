import React, { useEffect, useState } from 'react';

import ReactCountDown from 'react-countdown';
import { Span } from 'components/shared';

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

const Countdown = ({ onCountdown }) => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    setDate(Date.now() + 30000);
  }, []);

  const renderer = ({ formatted: { minutes, seconds }, completed }) => {
    return (
      <CountdownLabel>
        {minutes}:{seconds}
      </CountdownLabel>
    );
  };

  return (
    <Area>
      <ReactCountDown
        autoStart={true}
        date={date}
        renderer={renderer}
        onComplete={onCountdown}
      />
    </Area>
  );
};

export default Countdown;
