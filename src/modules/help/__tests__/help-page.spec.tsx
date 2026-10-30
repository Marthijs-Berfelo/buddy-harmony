import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { HelpPage } from '../help-page';

i18n.init({
  resources: {
    en: {
      common: {
        routing: { page: '', page_CHORD: 'Chords', page_SCALE: 'Scales', page_CAGED: 'C A G E D' },
      },
      'help-general': { content: '# General help' },
      'help-common': { content: '### Common tools' },
      'help-chord': { content: '# Chord help\n\nChord body text.' },
      'help-scale': { content: '# Scale help\n\nScale body text.' },
      'help-caged': { content: '# CAGED help\n\nCAGED body text.' },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const renderHelpPage = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <HelpPage />
    </I18nextProvider>
  );

describe('HelpPage', () => {
  test('renders the page container', () => {
    renderHelpPage();

    expect(document.getElementById('help-page')).toBeInTheDocument();
  });

  test('renders the general help content', () => {
    renderHelpPage();

    expect(screen.getByRole('heading', { name: 'General help' })).toBeInTheDocument();
  });

  test('renders the common tools help content', () => {
    renderHelpPage();

    expect(screen.getByRole('heading', { name: 'Common tools' })).toBeInTheDocument();
  });

  test('renders the per-page help tabs, defaulting to the first page', () => {
    renderHelpPage();

    expect(screen.getByRole('tab', { name: 'Chords' })).toBeInTheDocument();
    expect(screen.getByText('Chord body text.')).toBeInTheDocument();
  });
});
