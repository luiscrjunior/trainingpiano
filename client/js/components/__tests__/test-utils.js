import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'store/reducer';
import defaultValues from 'store/defaultValues';

/* recipe from https://redux.js.org/recipes/writing-tests */

function render(ui, state = {}, { ...renderOptions } = {}) {
  const store = createStore(reducer, state);
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
  Trans: ({ children }) => children,
}));

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
export { defaultValues };
