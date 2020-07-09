import React from 'react';

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
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.2};
`;

export default ({ lower, upper, selected, onClick }) => {

  const onSelectOctave = (e) => {
    if (!onClick) return;
    onClick({ lower, upper, selected });
    e.preventDefault();
  };

  return <Button>
    <Header>
      <Label>{lower}</Label>
      <Label>~</Label>
      <Label>{upper}</Label>
    </Header>
    <Octave src='images/piano_octave.png' selected={selected} onClick={onSelectOctave}/>
  </Button>;

};

