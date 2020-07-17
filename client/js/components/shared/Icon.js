import React from 'react';
import styled from 'styled-components';

const BaseIcon = ({ className, icon }) => {
  const iconType = icon instanceof Array && icon.length > 0 ? icon[0] : 'fas';
  const iconName =
    icon instanceof Array && icon.length > 1
      ? icon[1]
      : 'fa-exclamation-triangle';
  return <i className={`${className} ${iconType} ${iconName}`}></i>;
};

export const Icon = styled(BaseIcon)`
  display: inline-block;
  margin-right: ${(props) => (props.right ? `${props.right}px` : '0')};
  margin-left: ${(props) => (props.left ? `${props.left}px` : '0')};
  font-size: ${(props) => (props.size ? `${props.size}px` : '13px')};
  color: ${(props) => props.color || '#aaa'};
`;
