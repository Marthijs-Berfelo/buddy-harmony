import { render, screen, waitFor } from '@testing-library/react';
import { SettingsContextProvider, useSettings } from '../SettingsContextProvider';

const ProbeChild = () => {
  const { guitarType, tuningType, chordGuitarTypes } = useSettings();
  return (
    <div data-testid="probe">
      {guitarType.name}:{tuningType.name}:{chordGuitarTypes.length}
    </div>
  );
};

describe('SettingsContextProvider', () => {
  test('shows a loading state before chord data resolves', () => {
    render(
      <SettingsContextProvider>
        <ProbeChild />
      </SettingsContextProvider>
    );

    expect(screen.getByText('Loading..')).toBeInTheDocument();
    expect(screen.queryByTestId('probe')).not.toBeInTheDocument();
  });

  test('renders children with populated guitarType/tuningType once data resolves', async () => {
    render(
      <SettingsContextProvider>
        <ProbeChild />
      </SettingsContextProvider>
    );

    await waitFor(() => expect(screen.getByTestId('probe')).toBeInTheDocument());
    expect(screen.getByTestId('probe')).toHaveTextContent(/guitar:standard:\d+/);
  });
});
