import React, { useContext } from 'react';

import styled from 'styled-components';

import { Span } from 'components/shared';

const Button = styled.div`
  display: inline-block;
  width: 60px;
  margin-right: 15px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Label = styled(Span)`
  font-size: 11px;
  margin-left: 2px;
  margin-right: 2px;
`;

const Octave = styled.img`
  width: 60px;
  cursor: ${props => props.selectable ? 'pointer' : 'default'};
  opacity: ${props => props.selected ? 1 : 0.2};
`;

export default ({ lower, upper, selected, selectable, onClick }) => {

  const onSelectOctave = (e) => {
    if (!onClick) return;
    if (selectable === false) return;
    onClick({ lower, upper, selected });
    e.preventDefault();
  };

  return <Button>
    <Header>
      <Label>{lower}</Label>
      <Label>~</Label>
      <Label>{upper}</Label>
    </Header>
    <Octave src='images/piano_octave.png' selected={selected} selectable={selectable} onClick={onSelectOctave}/>
  </Button>;

};

