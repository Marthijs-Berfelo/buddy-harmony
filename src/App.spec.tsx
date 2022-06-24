import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app', async () => {
  const { container, findAllByText } = render(<App />);
  await findAllByText('title');
  expect(container).toMatchSnapshot();
});
