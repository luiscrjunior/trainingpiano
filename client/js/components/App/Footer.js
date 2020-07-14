import React from 'react';
import LanguageSelector from 'components/LanguageSelector';
import ShareBar from 'components/ShareBar';
import { Trans, useTranslation } from 'react-i18next';
import { Paragraph } from 'components/shared';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 867px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;  
  margin-top: 30px;
  & > * { margin-left: 70px; }
  & > *:first-child { margin-left: 0; }

`;

const FooterLeft = styled.div`
`;

const FooterCenter = styled.div`
  margin-left: 70px;
`;

const FooterRight = styled.div`
  margin-left: 70px;
`;

export default () => {

  const { t } = useTranslation();

  return <Wrapper>

    <Line>
      <Paragraph color={'#aaa'} size={14}><em><Trans i18nKey='msg_footer'>Still in <strong>beta</strong>. Soon, we will add F Clef, user ranking and other features... Feedback? <a href='mailto:contact@trainingpiano.com'>contact@trainingpiano.com</a></Trans></em></Paragraph>
    </Line>

    <Line>
      <ShareBar />
      <LanguageSelector />
    </Line>

    <Line>
      <Paragraph color={'#aaa'}>© Copyright 2020</Paragraph>
    </Line>

  </Wrapper>;

};

