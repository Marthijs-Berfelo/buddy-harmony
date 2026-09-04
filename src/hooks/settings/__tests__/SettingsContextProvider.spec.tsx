import { render, screen, waitFor } from '@testing-library/react';
import { SettingsContextProvider, useSettings } from '../SettingsContextProvider';

const ProbeChild = () => {
  const { guitarType, tuningType, chordGuitarTypes, chordDataLoading } = useSettings();
  return (
    <div data-testid="probe">
      {guitarType.name}:{tuningType.name}:{chordGuitarTypes.length}:{String(chordDataLoading)}
    </div>
  );
};

describe('SettingsContextProvider', () => {
  test('renders children immediately with chordDataLoading true and no chord guitar types', () => {
    render(
      <SettingsContextProvider>
        <ProbeChild />
      </SettingsContextProvider>
    );

    expect(screen.getByTestId('probe')).toHaveTextContent('guitar:standard:0:true');
  });

  test('flips chordDataLoading to false and populates chordGuitarTypes once chord data resolves', async () => {
    render(
      <SettingsContextProvider>
        <ProbeChild />
      </SettingsContextProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('probe')).toHaveTextContent(/guitar:standard:\d+:false/)
    );
    expect(screen.getByTestId('probe').textContent).not.toContain(':0:false');
  });
});
