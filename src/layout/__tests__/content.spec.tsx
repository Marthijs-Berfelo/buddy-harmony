import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Content } from '../content';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderContent = () => {
  const router = createMemoryRouter([
    { path: '/', element: <Content />, children: [{ index: true, element: <div>outlet</div> }] },
  ]);
  return render(
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
};

describe('Content', () => {
  test('wraps the routed outlet in the settings provider', async () => {
    renderContent();

    expect(document.getElementById('content')).toBeInTheDocument();
    expect(await screen.findByText('outlet')).toBeInTheDocument();
  });
});
