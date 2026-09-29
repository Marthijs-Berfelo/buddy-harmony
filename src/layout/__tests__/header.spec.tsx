import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Header } from '../header';
import { Pages } from 'routing/pages';
import { HelpDrawerProvider, useHelpDrawer } from '@/help/hooks/help-drawer-provider';
import { HelpSection } from '@/help/content-types';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderHeader = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <I18nextProvider i18n={i18n}>
        <HelpDrawerProvider>
          <Header />
        </HelpDrawerProvider>
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

  test('shows a help button on a page with a section mapping', () => {
    renderHeader(Pages.CHORD);

    expect(screen.getByRole('button', { name: 'help' })).toBeInTheDocument();
  });

  test('hides the help button on /help, which has no section mapping', () => {
    renderHeader(Pages.HELP);

    expect(screen.queryByRole('button', { name: 'help' })).not.toBeInTheDocument();
  });

  test('hides the help button on /harmony, which has no section mapping', () => {
    renderHeader(Pages.HARMONY);

    expect(screen.queryByRole('button', { name: 'help' })).not.toBeInTheDocument();
  });

  test('clicking help opens the drawer with the section matching the current route', async () => {
    const user = userEvent.setup();
    let capturedSection: HelpSection | undefined;
    const Probe = () => {
      const { activeSection } = useHelpDrawer();
      capturedSection = activeSection;
      return null;
    };

    render(
      <MemoryRouter initialEntries={[Pages.SCALE]}>
        <I18nextProvider i18n={i18n}>
          <HelpDrawerProvider>
            <Header />
            <Probe />
          </HelpDrawerProvider>
        </I18nextProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'help' }));

    expect(capturedSection).toBe(HelpSection.SCALE);
  });
});
