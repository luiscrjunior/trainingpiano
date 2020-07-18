import React from 'react';
import {
  render,
  defaultValues,
  waitFor,
  fireEvent,
  queryAllByText,
} from './test-utils';
import ConfigArea from 'components/ConfigArea';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
  Trans: ({ children }) => children,
}));

const getOctavesButtons = (container) => [
  ...container.querySelectorAll('img[src="images/piano_octave.png"]'),
];

const getSelectedOctaves = (buttons) =>
  buttons.map(
    (nodeElement) =>
      window.getComputedStyle(nodeElement).getPropertyValue('opacity') === '1'
  );

const getOctavesLabels = (container) => {
  const elLabels = [
    ...queryAllByText(container, /[A-Z]\/[0-9]/, {
      selector: 'span',
    }),
  ].map((nodeEl) => nodeEl.textContent.trim());
  return [elLabels[0], elLabels[elLabels.length - 1]];
};
it('octaves selector with default values', () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/4',
      upperNote: 'B/5',
      clef: 'treble',
    },
  };
  const { container, rerender } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  const selectedOctaves = getSelectedOctaves(octavesButtons);
  expect(selectedOctaves).toEqual([false, true, true, false]);
  let [firstLabel, lastLabel] = getOctavesLabels(container);
  expect(firstLabel).toBe('C/3');
  expect(lastLabel).toBe('B/6');
  state.config.clef = 'bass';
  rerender(<ConfigArea />, state);
  [firstLabel, lastLabel] = getOctavesLabels(container);
  expect(firstLabel).toBe('C/1');
  expect(lastLabel).toBe('B/4');
});

it('octaves selector with one selection', () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/4',
      upperNote: 'B/4',
      clef: 'treble',
    },
  };
  const { container } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  const selectedOctaves = getSelectedOctaves(octavesButtons);
  expect(selectedOctaves).toEqual([false, true, false, false]);
});

it('octaves selector with all selected', () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/3',
      upperNote: 'B/6',
      clef: 'treble',
    },
  };
  const { container } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  const selectedOctaves = getSelectedOctaves(octavesButtons);
  expect(selectedOctaves).toEqual([true, true, true, true]);
});

it('octaves selector click to add first octave', async () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/4',
      upperNote: 'B/5',
      clef: 'treble',
    },
  };
  const { container } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  fireEvent.click(octavesButtons[0]);
  await waitFor(() => {
    const selectedOctaves = getSelectedOctaves(octavesButtons);
    expect(selectedOctaves).toEqual([true, true, true, false]);
  });
});

it('octaves selector click to desselect octave', async () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/4',
      upperNote: 'B/5',
      clef: 'treble',
    },
  };
  const { container } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  fireEvent.click(octavesButtons[1]);
  await waitFor(() => {
    const selectedOctaves = getSelectedOctaves(octavesButtons);
    expect(selectedOctaves).toEqual([false, false, true, false]);
  });
});

it('octaves selector click last to select all', async () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/1',
      upperNote: 'B/1',
      clef: 'bass',
    },
  };
  const { container } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  fireEvent.click(octavesButtons[3]);
  await waitFor(() => {
    const selectedOctaves = getSelectedOctaves(octavesButtons);
    expect(selectedOctaves).toEqual([true, true, true, true]);
  });
});

it('octaves selector click next to deselect', async () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/1',
      upperNote: 'B/4',
      clef: 'bass',
    },
  };
  const { container } = render(<ConfigArea />, state);
  const octavesButtons = getOctavesButtons(container);
  fireEvent.click(octavesButtons[1]);
  await waitFor(() => {
    const selectedOctaves = getSelectedOctaves(octavesButtons);
    expect(selectedOctaves).toEqual([true, false, false, false]);
  });
});

it('change clef = change octaves', async () => {
  const state = {
    ...defaultValues,
    config: {
      ...defaultValues.config,
      lowerNote: 'C/4',
      upperNote: 'B/5',
      clef: 'treble',
    },
  };
  const { container, getByText } = render(<ConfigArea />, state);
  let [firstLabel, lastLabel] = getOctavesLabels(container);
  expect(firstLabel).toBe('C/3');
  expect(lastLabel).toBe('B/6');
  const select = getByText('lbl_config_clef').nextSibling;
  fireEvent.change(select, { target: { value: 'bass' } });
  await waitFor(() => {
    [firstLabel, lastLabel] = getOctavesLabels(container);
    expect(firstLabel).toBe('C/1');
    expect(lastLabel).toBe('B/4');
  });
});
