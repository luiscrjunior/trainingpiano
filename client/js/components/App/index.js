import React, { useContext, useEffect } from 'react';

import Clef from 'components/Clef';
import styled from 'styled-components';

import { Context } from 'store';
import { Paragraph, Button } from 'components/shared';

import { generateRandomNotes } from 'app/utils';

const Content = styled.div`
  width: 960px;
  margin: 30px auto 0 auto;
  text-align: center;
`;

const App = () => {

  useEffect(() => {

    navigator.requestMIDIAccess()
      .then(function(access) {

        // Get lists of available MIDI controllers
        const inputs = access.inputs.values();

        function getMIDIMessage(message) {
          var command = message.data[0];
          var note = message.data[1];
          var velocity = message.data[2];
       
          switch (command) {
            case 128: // noteOff
            case 144: // noteOn
              console.log('Command: ' + command +
                ' , Note: ' + note + ' , Velocity: ' + velocity);
              break;
            }
        }	        

        for (var input of inputs) {
          input.onmidimessage = getMIDIMessage;
        }
    });

  }, []);

  const [state, dispatch] = useContext(Context);

  const drawAnotherNotes = () => {
    const newNotes = generateRandomNotes();
    dispatch({ type: 'GENERATE_NEW_NOTES', value: newNotes });
  };

  return <Content>

    <Clef />

    <Button btnStyle='primary' btnSize='lg' label='Outra nota' onClick={drawAnotherNotes}/>

  </Content>;

};

export default App;
