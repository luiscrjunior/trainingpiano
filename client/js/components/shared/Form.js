import React from 'react';
import { Paragraph, Span } from 'components/shared';
import ReactToggle from 'react-toggle';

export const FormItem = (props) => {
  const { label, hint, children } = props;

  return (
    <div css="margin-bottom: 20px;">
      <label>
        <Paragraph size={11} css="margin-bottom: 5px;">
          {label}
        </Paragraph>
        {children}
      </label>
      {hint && (
        <Span size={11} css="margin-left: 10px">
          <em>{hint}</em>
        </Span>
      )}
    </div>
  );
};

export const Toggle = (props) => <ReactToggle {...props} />;
