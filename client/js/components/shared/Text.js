import React from 'react';
import styled from 'styled-components';

export const Paragraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${(props) => (props.size ? `${props.size}px` : '13px')};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
  color: ${(props) => (props.color ? props.color : '#424242')};
  font-family: 'Roboto', sans-serif;
`;

export const Span = (props) => (
  <Paragraph className={props.className} as="span" {...props} />
);

const CleanAnchor = styled.a`
  display: inline-block;
  text-decoration: none;
  font-weight: normal;
  color: #424242;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:link,
  &:visited,
  &:hover,
  &:active {
    text-decoration: none;
    font-weight: normal;
  }
`;

export const Anchor = (props) => {
  const { children, onClick, ...otherProps } = props;

  const onAnchorClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <CleanAnchor href="#" onClick={onAnchorClick} {...otherProps}>
      {children}
    </CleanAnchor>
  );
};

export const SeparatorLabel = styled(Paragraph)`
  position: relative;
  font-size: 12px;
  color: #aaa;
  padding: 10px 0;
  overflow: hidden;
  width: 100%;
  text-align: center;

  &:before,
  &:after {
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 50%;
    height: 1px;
    content: '\a0';
    background-color: #ddd;
    margin-left: 5%;
  }

  &:before {
    margin-left: -55%;
    text-align: right;
  }
`;
