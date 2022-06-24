import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app', async () => {
  const { findAllByText } = render(<App />);
  const titles = await findAllByText('title');
  expect(titles.length).toBeGreaterThan(0);
});
