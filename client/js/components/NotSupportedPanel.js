import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';

import { Button, Paragraph } from 'components/shared';

import styled from 'styled-components';

const Text = styled(Paragraph)`
  margin-top: 15px;
  font-size: 16px;
`;

export default ({ onClose }) => {

  return <FloatingPanel onClose={onClose} title='Browser not supported'>

    <Text>
      Unfortunately, your browser does not support Web MIDI API. So, we can't access your MIDI device.
    </Text>

    <Text>
      Actually, our app runs in <strong>Google Chrome</strong> (> 43), <strong>Edge</strong> (> 79) and <strong>Opera</strong> (> 33). But, please, check the compatible browsers <a href='https://caniuse.com/#feat=mdn-api_midiaccess'>here</a>.
    </Text>

    <ButtonArea>
      <Button btnSize='lg' btnStyle='primary' label='Close' onClick={onClose}/>
    </ButtonArea>

  </FloatingPanel>;

};

