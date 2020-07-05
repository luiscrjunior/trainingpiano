import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';

import { Button, Paragraph } from 'components/shared';

import { Context } from 'store';

import styled from 'styled-components';

const Text = styled(Paragraph)`
  margin-top: 15px;
  font-size: 16px;
`;

export default ({ onClose }) => {

  const [state, dispatch] = useContext(Context);

  let title;
  switch (state.stats.status) {
  case 'completed':
    title = 'Finished';
    break;
  case 'canceled':
    title = 'Canceled';
    break;
  default:
    title = 'Finished';
  }

  return <FloatingPanel onClose={onClose} title={title}>

    <Text>
      <strong>Correct notes: </strong>{state.stats.hits}
    </Text>

    <Text>
      <strong>Score: </strong>{state.stats.score}
    </Text>

    <ButtonArea>
      <Button btnSize='lg' btnStyle='primary' label='Close' onClick={onClose}/>
    </ButtonArea>

  </FloatingPanel>;

};

