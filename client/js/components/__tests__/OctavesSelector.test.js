import React from 'react';
import { render, defaultValues, waitFor, fireEvent } from './test-utils';
import OctavesSelector from 'components/ConfigArea/OctavesSelector';

it('render correct note range', () => {
  const state = { ...defaultValues };
  state.config.clef = 'treble';
  const { queryByText, rerender } = render(
    <OctavesSelector onChange={jest.fn()} />,
    state
  );
  expect(queryByText('C/3', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/4', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/5', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/6', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/1', { selector: 'span' })).toBeNull();
  state.config.clef = 'bass';
  rerender(<OctavesSelector onChange={jest.fn()} />, state);
  expect(queryByText('C/1', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/2', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/3', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/4', { selector: 'span' })).not.toBeNull();
  expect(queryByText('C/5', { selector: 'span' })).toBeNull();
});

it('select correct octave', async () => {
  const state = { ...defaultValues };
  state.config.lowerNote = 'C/4';
  state.config.upperNote = 'B/5';
  state.config.clef = 'treble';
  const onChange = jest.fn();
  const { container } = render(<OctavesSelector onChange={onChange} />, state);
  fireEvent.click(container.querySelectorAll('img')[0]);
  await waitFor(() => expect(onChange).toHaveBeenCalledWith('C/3', 'B/5'));
});

it('select correct octave (click one more)', async () => {
  const state = { ...defaultValues };
  state.config.lowerNote = 'C/5';
  state.config.upperNote = 'B/5';
  state.config.clef = 'treble';
  const onChange = jest.fn();
  const { container } = render(<OctavesSelector onChange={onChange} />, state);
  fireEvent.click(container.querySelectorAll('img')[0]);
  await waitFor(() => expect(onChange).toHaveBeenCalledWith('C/3', 'B/5'));
});

it('unselect octave', async () => {
  const state = { ...defaultValues };
  state.config.lowerNote = 'C/4';
  state.config.upperNote = 'B/5';
  state.config.clef = 'treble';
  const onChange = jest.fn();
  const { container } = render(<OctavesSelector onChange={onChange} />, state);
  fireEvent.click(container.querySelectorAll('img')[1]);
  await waitFor(() => expect(onChange).toHaveBeenCalledWith('C/5', 'B/5'));
});

it('cant unselect octave if unique', async () => {
  const state = { ...defaultValues };
  state.config.lowerNote = 'C/4';
  state.config.upperNote = 'B/4';
  state.config.clef = 'treble';
  const onChange = jest.fn();
  const { container } = render(<OctavesSelector onChange={onChange} />, state);
  fireEvent.click(container.querySelectorAll('img')[1]);
  await waitFor(() => expect(onChange).not.toHaveBeenCalled());
});
