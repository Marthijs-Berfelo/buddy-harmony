import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Header } from '../header';
import { Pages } from 'routing/pages';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderHeader = () =>
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    </MemoryRouter>
  );

describe('Header', () => {
  test('renders a menu trigger and lists every page as a nav link once opened', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'menu' }));

    Object.values(Pages).forEach((path) => {
      expect(document.querySelector(`a[href="${path}"]`)).toBeInTheDocument();
    });
  });
});
