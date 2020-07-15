import React, { useContext, useRef, useEffect } from 'react';

import styled from 'styled-components';

import { Paragraph, Icon, BaseAnchor } from 'components/shared';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #424242;
  opacity: 0.4;
  z-index: 10;
`;

const Panel = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0;
  width: 720px;
  min-height: 100px;  
  height: auto;
  background: #fff;
  border: none;
  outline: none;
  box-shadow: 0 4px 8px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
  text-align: left;
  z-index: 20;

  &:focus { outline: none; }
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  padding: 15px 0 10px 15px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  font-weight: 700;
`;

const Content = styled.div`
  padding: 15px;
`;

const CloseIcon = styled(Icon).attrs(props => ({
  icon: ['fas', 'fa-window-close'],
}))`
  font-size: 26px;
  color: #0091EA;
`;

const CloseButton = styled(props => <BaseAnchor {...props}><CloseIcon /></BaseAnchor>)`
  position: absolute;
  top: 13px;
  right: 13px;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export default ({ title, onClose, children }) => {

  const panelRef = useRef(null);

  useEffect(() => {
    panelRef.current.focus();
  }, []);

  const closePanel = () => {
    if (onClose) onClose();
  };

  const onPanelKeyDown = (e) => {
    if (e.key === 'Escape') {
      closePanel();
      e.stopPropagation();
    }
  };

  return <>
    <Overlay onClick={(e) => closePanel()} />
    <Panel tabIndex="0" onKeyDown={onPanelKeyDown} ref={panelRef}>
      <Title>{title}</Title>
      <CloseButton onClick={(e) => closePanel()} />
      <Content>{children}</Content>
    </Panel>
  </>;

};

