import React, { useContext } from 'react';

import { Context } from 'store';

import styled from 'styled-components';

import styles from './styles.scss';

const pianoKeys = [

  { whiteKeyId: 48 },
  { blackKeyId: 49, whiteKeyId: 50 },
  { blackKeyId: 51, whiteKeyId: 52 },
  { whiteKeyId: 53 },
  { blackKeyId: 54, whiteKeyId: 55 },
  { blackKeyId: 56, whiteKeyId: 57 },
  { blackKeyId: 58, whiteKeyId: 59 },

  { whiteKeyId: 60 },
  { blackKeyId: 61, whiteKeyId: 62 },
  { blackKeyId: 63, whiteKeyId: 64 },
  { whiteKeyId: 65 },
  { blackKeyId: 66, whiteKeyId: 67 },
  { blackKeyId: 68, whiteKeyId: 69 },
  { blackKeyId: 70, whiteKeyId: 71 },

  { whiteKeyId: 72 },
  { blackKeyId: 73, whiteKeyId: 74 },
  { blackKeyId: 75, whiteKeyId: 76 },
  { whiteKeyId: 77 },
  { blackKeyId: 78, whiteKeyId: 79 },
  { blackKeyId: 80, whiteKeyId: 81 },
  { blackKeyId: 82, whiteKeyId: 83 },

  { whiteKeyId: 84 },
  { blackKeyId: 85, whiteKeyId: 86 },
  { blackKeyId: 87, whiteKeyId: 88 },
  { whiteKeyId: 89 },
  { blackKeyId: 90, whiteKeyId: 91 },
  { blackKeyId: 92, whiteKeyId: 93 },
  { blackKeyId: 94, whiteKeyId: 95 },

];

export default () => {

  const [state, dispatch] = useContext(Context);

  return <div className={styles.wrapper}>
    <ul className={styles.piano}>
      { pianoKeys.map((key) =>
        <li key={key.whiteKeyId}>
          <div className={styles.anchor}></div>
          {key.blackKeyId && <span></span>}
        </li>
      )}
    </ul>
  </div>;

};

