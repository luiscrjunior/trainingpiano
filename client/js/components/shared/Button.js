import React from 'react';
import { Button as ReactButton } from '@trendmicro/react-buttons';
import { Icon, Span } from 'components/shared';

import styled from 'styled-components';

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

export const ActionButton = ({ size, label, icon }) => <Button btnStyle='primary' btnSize='lg'>
  <Icon icon={icon} color='#fff' size={size} right={10}/>
  <Span color='#fff' size={size} bold>{label}</Span>
</Button>;

export const BaseAnchor = styled((props) => {

  const { onClick, children, ...anchorProps } = props;

  const onAnchorClick = (e) => {
    if (onClick) onClick();
    e.preventDefault();
  };

  return <a
    href="#"
    onClick={onAnchorClick}
    {...anchorProps}
  >{children}</a>;
})`
  text-decoration: none;
  
  &:link, &:visited, &:hover, &:active {
    text-decoration: none;
  }
`;
