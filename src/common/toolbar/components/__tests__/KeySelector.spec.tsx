import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import KeySelector from '../KeySelector';
import { SettingsContextProvider } from '@/hooks';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderKeySelector = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <SettingsContextProvider>
        <KeySelector keys={['C', 'D']} setSelectedKey={() => {}} />
      </SettingsContextProvider>
    </I18nextProvider>
  );

describe('KeySelector', () => {
  test('shows the note-wave loader while chord data is loading', () => {
    renderKeySelector();

    expect(screen.getAllByTestId('note-wave-glyph')).toHaveLength(3);
  });

  test('shows the key dropdown once chord data has resolved', async () => {
    renderKeySelector();

    const trigger = await screen.findByRole('button', { name: 'key' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.queryByTestId('note-wave-glyph')).not.toBeInTheDocument();
  });
});
