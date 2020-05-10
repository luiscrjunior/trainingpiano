import React, { useContext } from 'react';

import styled from 'styled-components';

import { Context } from 'store';
import { Paragraph, Span, Button, Icon, SeparatorLabel, Input } from 'components/shared';

const Content = styled.div`
  width: 960px;
  margin: 30px auto 0 auto;
  text-align: center;
`;

const Container = styled.div`
  margin: 40px 0;
  text-align: left;
`;

const App = () => {

  const [state, dispatch] = useContext(Context);

  return <Content>

    <Paragraph size={32}>react-boilerplate</Paragraph>

    <SeparatorLabel>Store</SeparatorLabel>

    <Container>
      <Paragraph>Message from store: <Span bold>{state.message}</Span></Paragraph>
    </Container>

    <Container>
      <Input label='New Message' value={state.message} onChange={ (e) => dispatch({ type: 'SET_NEW_MESSAGE', value: e.target.value }) } />
    </Container>

    <SeparatorLabel>Some components</SeparatorLabel>

    <Container>
      <Button label='Button' />
      <Button btnStyle='primary' label='Primary Button'/>
      <Button icon={['fas', 'fa-edit']} label='Button with icon' />
    </Container>

    <Container>
      <Icon icon={['fab', 'fa-fort-awesome']} size={24} color='red' />
      <Span>(Icon)</Span>
    </Container>

    <Container>
      <Input label='Input label' placeholder='Input...' />
    </Container>

  </Content>;

};

export default App;
