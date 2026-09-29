import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelpDrawerProvider, useHelpDrawer } from '../help-drawer-provider';
import { HelpSection } from '@/help/content-types';

const Probe = () => {
  const { isOpen, activeSection, open, close } = useHelpDrawer();
  return (
    <div>
      <div data-testid="state">{`${isOpen}:${activeSection ?? 'none'}`}</div>
      <button onClick={() => open(HelpSection.SCALE)}>open-scale</button>
      <button onClick={() => close()}>close</button>
    </div>
  );
};

const renderWithRoute = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <HelpDrawerProvider>
        <Routes>
          <Route path="*" element={<Probe />} />
        </Routes>
      </HelpDrawerProvider>
    </MemoryRouter>
  );

describe('HelpDrawerProvider / useHelpDrawer', () => {
  test('starts closed with no active section', () => {
    renderWithRoute('/chord');

    expect(screen.getByTestId('state')).toHaveTextContent('false:none');
  });

  test('open(section) sets isOpen true and records the section', async () => {
    renderWithRoute('/chord');

    await act(async () => screen.getByText('open-scale').click());

    expect(screen.getByTestId('state')).toHaveTextContent('true:scale');
  });

  test('close() resets isOpen to false but keeps the last section', async () => {
    renderWithRoute('/chord');

    await act(async () => screen.getByText('open-scale').click());
    await act(async () => screen.getByText('close').click());

    expect(screen.getByTestId('state')).toHaveTextContent('false:scale');
  });

  test('throws when useHelpDrawer is called outside the provider', () => {
    const BareProbe = () => {
      useHelpDrawer();
      return null;
    };

    expect(() => render(<BareProbe />)).toThrow(
      '`useHelpDrawer` must be used with `HelpDrawerProvider`'
    );
  });
});
