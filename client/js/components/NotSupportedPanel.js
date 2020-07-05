import React, { useContext } from 'react';

import FloatingPanel, { ButtonArea } from 'components/FloatingPanel';

import { Button, Paragraph } from 'components/shared';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Text = styled(Paragraph)`
  margin-top: 15px;
  font-size: 16px;
`;

export default ({ onClose }) => {

  const { t } = useTranslation();

  return <FloatingPanel onClose={onClose} title={t('lbl_not_supported')}>

    <Text>
      <Trans i18nKey='msg_unsupported_1'>
      Unfortunately, your browser does not support Web MIDI API. So, we can't access your MIDI device.
      </Trans>
    </Text>

    <Text>
      <Trans i18nKey='msg_unsupported_2'>
      Actually, our app runs in <strong>Google Chrome</strong> (> 43), <strong>Edge</strong> (> 79) and <strong>Opera</strong> (> 33). But, please, check the compatible browsers <a href='https://caniuse.com/#feat=mdn-api_midiaccess'>here</a>.
      </Trans>
    </Text>

    <ButtonArea>
      <Button btnSize='lg' btnStyle='primary' label={t('btn_close')} onClick={onClose}/>
    </ButtonArea>

  </FloatingPanel>;

};

