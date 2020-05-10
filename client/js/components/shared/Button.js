import React from 'react';
import { Button as ReactButton } from '@trendmicro/react-buttons';
import { Icon } from 'components/shared';

export const Button = (props) => {

  const { label, icon, onClick, children, ...buttonProps } = props;

  const onSubmit = (e) => {
    if (onClick) onClick(e);
    if (props.type === 'submit') e.preventDefault();
  };

  return <ReactButton
    btnSize="extra-small"
    btnStyle="flat"
    onClick={onSubmit}
    {...buttonProps}
  >
    { icon && <Icon icon={icon} size={12} right={ label ? 10 : 0} /> }
    { label || children }
  </ReactButton>;

};
