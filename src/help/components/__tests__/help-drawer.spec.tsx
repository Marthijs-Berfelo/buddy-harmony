import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { HelpDrawer } from '../help-drawer';
import { useHelpDrawer, HelpDrawerProvider } from '@/help/hooks/help-drawer-provider';
import { HelpSection } from '@/help/content-types';
import { MemoryRouter } from 'react-router-dom';

i18n.init({
  resources: {
    en: {
      'help-chord': { content: '# Chord help' },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const OpenChordHelp = () => {
  const { open } = useHelpDrawer();
  return <button onClick={() => open(HelpSection.CHORD)}>open</button>;
};

const renderDrawer = () =>
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <HelpDrawerProvider>
          <OpenChordHelp />
          <HelpDrawer />
        </HelpDrawerProvider>
      </I18nextProvider>
    </MemoryRouter>
  );

describe('HelpDrawer', () => {
  test('renders nothing before it is opened', () => {
    renderDrawer();

    expect(screen.queryByRole('heading', { name: 'Chord help' })).not.toBeInTheDocument();
  });

  test('renders the active section content once opened', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByText('open'));

    expect(screen.getByRole('heading', { name: 'Chord help' })).toBeInTheDocument();
  });

  test('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByText('open'));
    await user.click(screen.getByRole('button', { name: 'close' }));

    expect(screen.queryByRole('heading', { name: 'Chord help' })).not.toBeInTheDocument();
  });
});
