import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { HelpTabs } from '../help-tabs';

i18n.init({
  resources: {
    en: {
      'common': {
        routing: {
          page: '',
          page_CHORD: 'Chords',
          page_SCALE: 'Scales',
          page_CAGED: 'C A G E D',
        },
      },
      'help-chord': { content: '# Chord help\n\nChord body text.' },
      'help-scale': { content: '# Scale help\n\nScale body text.' },
      'help-caged': { content: '# CAGED help\n\nCAGED body text.' },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const renderHelpTabs = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <HelpTabs />
    </I18nextProvider>
  );

describe('HelpTabs', () => {
  test('renders a tab for each feature page, labeled from common translations', () => {
    renderHelpTabs();

    expect(screen.getByRole('tab', { name: 'Chords' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Scales' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'C A G E D' })).toBeInTheDocument();
  });

  test("shows the first tab's help content by default, without its redundant page heading", () => {
    renderHelpTabs();

    expect(screen.getByText('Chord body text.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Chord help' })).not.toBeInTheDocument();
  });

  test("clicking a tab switches to that page's help content", async () => {
    const user = userEvent.setup();
    renderHelpTabs();

    await user.click(screen.getByRole('tab', { name: 'Scales' }));

    expect(screen.getByText('Scale body text.')).toBeInTheDocument();
    expect(screen.queryByText('Chord body text.')).not.toBeInTheDocument();
  });
});
