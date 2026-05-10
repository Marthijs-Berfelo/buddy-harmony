import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

test('renders app', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <div>common:title</div>
      </I18nextProvider>
    </MemoryRouter>
  );
  const title = await findByText('common:title');
  expect(title).toBeTruthy();
});
