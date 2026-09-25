import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement } from 'react';
import { ScaleTriadToggle } from '../scale-triad-toggle';

i18n.init({
  resources: {
    en: {
      scale: {
        'triad-toggle-label': 'Show triads',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const renderToggle = (showTriads = true, onShowTriadsChange = vi.fn()) =>
  render(
    createElement(
      I18nextProvider,
      { i18n },
      createElement(ScaleTriadToggle, { showTriads, onShowTriadsChange })
    )
  );

describe('ScaleTriadToggle', () => {
  test('renders the switch reflecting showTriads', () => {
    renderToggle(true);

    expect(screen.getByRole('switch', { name: 'Show triads' })).toBeChecked();
  });

  test('renders the switch as unchecked when showTriads is false', () => {
    renderToggle(false);

    expect(screen.getByRole('switch', { name: 'Show triads' })).not.toBeChecked();
  });

  test('calls onShowTriadsChange with the flipped value when toggled', async () => {
    const user = userEvent.setup();
    const onShowTriadsChange = vi.fn();
    renderToggle(false, onShowTriadsChange);

    await user.click(screen.getByRole('switch', { name: 'Show triads' }));

    expect(onShowTriadsChange).toHaveBeenCalledWith(true);
  });
});
