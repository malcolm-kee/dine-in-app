import { renderWithRouter } from 'lib/test-util';
import * as React from 'react';
import { App } from './app';

test('renders correct title in home page', () => {
  const { container } = renderWithRouter(<App />);

  expect(container.querySelector('h1')).toMatchInlineSnapshot(`
    <h1
      class="text-4xl text-center text-gray-600"
    >
      Welcome to Dine-In!
    </h1>
  `);
});

test('shows not found page for nonexistent url', () => {
  const { getByText } = renderWithRouter(<App />, {
    initialRoute: '/broken-link',
  });

  expect(getByText('Page Not Found')).toBeVisible();
});
