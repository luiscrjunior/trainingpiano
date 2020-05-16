import React, { useRef, useContext, useEffect } from 'react';

import styled from 'styled-components';

import { translateNote } from 'app/utils';

import { Context } from 'store';

const App = () => {

  const [state, dispatch] = useContext(Context);

  if (!state.notes || state.notes.length === 0) return null;

  return <h1>{state.notes.map(note => translateNote(note)).join(', ')}</h1>;

};

export default App;
