import React from 'react';
import {
  render,
  defaultValues,
  waitFor,
  fireEvent,
  queryAllByText,
} from './test-utils';
import VirtualPiano from 'components/VirtualPiano';

const getOctavesLabels = (container) => {
  const elLabels = [
    ...queryAllByText(container, /[A-Z]\/[0-9]/, {
      selector: 'span',
    }),
  ].map((nodeEl) => nodeEl.textContent.trim());
  return [elLabels[0], elLabels[elLabels.length - 1]];
};

it('default render with correct note range', () => {
  const state = { ...defaultValues };
  const { container, rerender } = render(<VirtualPiano />, state);
  let [firstLabel, lastLabel] = getOctavesLabels(container);
  expect(firstLabel).toBe('C/3');
  expect(lastLabel).toBe('B/6');
  state.config.clef = 'bass';
  rerender(<VirtualPiano />, state);
  [firstLabel, lastLabel] = getOctavesLabels(container);
  expect(firstLabel).toBe('C/1');
  expect(lastLabel).toBe('B/4');
});

it('press and unpress white keys', async () => {
  const { container } = render(<VirtualPiano />, defaultValues);
  const whiteKeys = [...container.querySelectorAll('div[class*="WhiteKey"')];
  expect(whiteKeys[9].classList.contains('active')).toBe(false);
  fireEvent.click(whiteKeys[9]);
  await waitFor(() => {
    expect(whiteKeys[9].classList.contains('active')).toBe(true);
  });
  fireEvent.click(whiteKeys[9]);
  await waitFor(() => {
    expect(whiteKeys[9].classList.contains('active')).toBe(false);
  });
});

it('press and unpress black keys', async () => {
  const { container } = render(<VirtualPiano />, defaultValues);
  const blackKeys = [...container.querySelectorAll('span[class*="BlackKey"')];
  expect(blackKeys[5].classList.contains('active')).toBe(false);
  fireEvent.click(blackKeys[5]);
  await waitFor(() => {
    expect(blackKeys[5].classList.contains('active')).toBe(true);
  });
  fireEvent.click(blackKeys[5]);
  await waitFor(() => {
    expect(blackKeys[5].classList.contains('active')).toBe(false);
  });
});

it('bottom message', async () => {
  const { queryByText, rerender } = render(<VirtualPiano />, defaultValues);
  expect(queryByText(/piano_msg_unsupported/)).not.toBeNull();
  navigator.requestMIDIAccess = () => {};
  rerender(<VirtualPiano />, defaultValues);
  expect(queryByText(/piano_msg_supported/)).not.toBeNull();
});
