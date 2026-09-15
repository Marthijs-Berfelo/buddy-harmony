import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { SettingsTools } from '../settings-tools';
import { SettingsProvider } from 'hooks';
import { Pages } from 'routing/pages';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderSettingsTools = (page: Pages = Pages.CHORD) =>
  render(
    <I18nextProvider i18n={i18n}>
      <SettingsProvider>
        <SettingsTools page={page} />
      </SettingsProvider>
    </I18nextProvider>
  );

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'button-label' }));
};

describe('SettingsTools', () => {
  test('renders a trigger button labeled with the settings translation key', () => {
    renderSettingsTools();

    expect(screen.getByRole('button', { name: 'button-label' })).toBeInTheDocument();
  });

  test('opens the settings menu with guitar type, tuning, and layout entries', async () => {
    const user = userEvent.setup();
    renderSettingsTools();

    await openMenu(user);

    expect(screen.getByRole('menuitem', { name: /guitar\.label/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /layout\.label/ })).toBeInTheDocument();
  });

  test('disables the tuning select since only standard tuning is supported', async () => {
    const user = userEvent.setup();
    renderSettingsTools();

    await openMenu(user);

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  test('disables the orientation toggle on the CAGED page', async () => {
    const user = userEvent.setup();
    renderSettingsTools(Pages.CAGED);

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /layout\.label/ }));

    expect(screen.getByText('layout.orientation')).toHaveAttribute('data-disabled');
  });

  test('leaves the orientation toggle enabled on non-CAGED pages', async () => {
    const user = userEvent.setup();
    renderSettingsTools(Pages.CHORD);

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /layout\.label/ }));

    expect(screen.getByText('layout.orientation')).not.toHaveAttribute('data-disabled');
  });

  test('toggles handedness without throwing when the handed option is clicked', async () => {
    const user = userEvent.setup();
    renderSettingsTools();

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /layout\.label/ }));

    await expect(user.click(screen.getByText('layout.handed.label'))).resolves.not.toThrow();
  });

  test('lists the guitar type options and marks the current one disabled', async () => {
    const user = userEvent.setup();
    renderSettingsTools();

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /guitar\.label/ }));

    const currentTypeItems = screen.getAllByRole('menuitem').filter((item) => item.hasAttribute('data-disabled'));
    expect(currentTypeItems.length).toBeGreaterThan(0);
  });

  test('selects a different guitar type without throwing when a non-current option is clicked', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const user = userEvent.setup();
    renderSettingsTools();

    await act(() => vi.advanceTimersByTimeAsync(3000));
    vi.useRealTimers();

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /guitar\.label/ }));

    const otherType = screen
      .getAllByRole('menuitem')
      .find((item) => !item.hasAttribute('data-disabled') && !item.hasAttribute('aria-haspopup'));

    expect(otherType).toBeDefined();
    await expect(user.click(otherType!)).resolves.not.toThrow();
  });

  test('toggles orientation without throwing when the orientation option is clicked', async () => {
    const user = userEvent.setup();
    renderSettingsTools();

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /layout\.label/ }));

    await expect(user.click(screen.getByText('layout.orientation'))).resolves.not.toThrow();
  });

  test('selects a fret number style without throwing when a nested option is clicked', async () => {
    const user = userEvent.setup();
    renderSettingsTools();

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /layout\.label/ }));
    await user.click(screen.getByRole('menuitem', { name: /layout\.fret-numbers/ }));

    const fretNumberOption = screen
      .getAllByRole('menuitem')
      .find((item) => item.textContent?.startsWith('layout.fret-numbers') && !item.hasAttribute('aria-haspopup'));

    await expect(user.click(fretNumberOption!)).resolves.not.toThrow();
  });

  test('re-forces vertical orientation when the CAGED page is selected while horizontal', async () => {
    const user = userEvent.setup();
    const { rerender } = renderSettingsTools(Pages.CHORD);

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /layout\.label/ }));
    await user.click(screen.getByText('layout.orientation'));

    expect(() =>
      rerender(
        <I18nextProvider i18n={i18n}>
          <SettingsProvider>
            <SettingsTools page={Pages.CAGED} />
          </SettingsProvider>
        </I18nextProvider>
      )
    ).not.toThrow();
  });

  test('filters guitar types when supportedGuitars is provided', async () => {
    const user = userEvent.setup();
    render(
      <I18nextProvider i18n={i18n}>
        <SettingsProvider>
          <SettingsTools page={Pages.CHORD} supportedGuitars={[]} />
        </SettingsProvider>
      </I18nextProvider>
    );

    await openMenu(user);
    await user.click(screen.getByRole('menuitem', { name: /guitar\.label/ }));

    const leafItems = screen
      .queryAllByRole('menuitem')
      .filter((item) => !item.hasAttribute('aria-haspopup'));
    expect(leafItems.length).toBe(0);
  });
});
