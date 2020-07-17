import React from 'react';
import { Paragraph } from 'components/shared';
import ReactToggle from 'react-toggle';

export const FormItem = (props) => {
  const { label, children } = props;

  return (
    <div css="margin-bottom: 20px;">
      <label>
        <Paragraph size={11} css="margin-bottom: 5px;">
          {label}
        </Paragraph>
        {children}
      </label>
    </div>
  );
};

export const Toggle = (props) => <ReactToggle {...props} />;
