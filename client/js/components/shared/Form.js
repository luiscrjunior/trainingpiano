import React from 'react';
import styled from 'styled-components';
import { Paragraph, Span } from 'components/shared';

export const Input = (props) => {

  const { label, ...inputProps } = props;

  return <div css='margin-bottom: 10px;'>
    <label><Paragraph size={11} css='margin-bottom: 5px;'>{label}</Paragraph>
      <input {...inputProps}></input>
    </label>
  </div>;

};
