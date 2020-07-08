import React from 'react';

import styled from 'styled-components';

const Bar = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Icon = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  align-items: center;

  &:first-child { margin-left: 0; }
`;

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,

  EmailShareButton,
  EmailIcon,

  RedditShareButton,
  RedditIcon,
  RedditShareCount,

  TwitterShareButton,
  TwitterIcon,

  TelegramShareButton,
  TelegramIcon,

  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const url = 'https://www.trainingpiano.com/';

export default () => {

  return <Bar>

    <Icon>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round/>
      </FacebookShareButton>
      <FacebookShareCount url={url} />
    </Icon>

    <Icon>
      <RedditShareButton url={url}>
        <RedditIcon size={32} round/>
      </RedditShareButton>
      <RedditShareCount url={url} />
    </Icon>

    <Icon>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round/>
      </TwitterShareButton>
    </Icon>

    <Icon>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round/>
      </WhatsappShareButton>
    </Icon>

    <Icon>
      <TelegramShareButton url={url}>
        <TelegramIcon size={32} round/>
      </TelegramShareButton>
    </Icon>

    <Icon>
      <EmailShareButton url={url}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </Icon>

  </Bar>;

};

