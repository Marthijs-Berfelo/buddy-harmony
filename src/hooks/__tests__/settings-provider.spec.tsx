import { act, render, screen } from '@testing-library/react';
import { SettingsProvider, useSettings } from '../settings-provider';
import { computeGuitarTypes } from 'hooks';

const ProbeChild = () => {
  const { guitarType, tuningType, chordGuitarTypes, chordDataLoading } = useSettings();
  return (
    <div data-testid="probe">
      {guitarType.name}:{tuningType.name}:{chordGuitarTypes.length}:{String(chordDataLoading)}
    </div>
  );
};

describe('SettingsProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders children immediately with chordDataLoading true and no chord guitar types', () => {
    render(
      <SettingsProvider>
        <ProbeChild />
      </SettingsProvider>
    );

    expect(screen.getByTestId('probe')).toHaveTextContent('guitar:standard:0:true');
  });

  test('flips chordDataLoading to false and populates chordGuitarTypes once the minimum display delay elapses', async () => {
    render(
      <SettingsProvider>
        <ProbeChild />
      </SettingsProvider>
    );

    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(3000));

    expect(screen.getByTestId('probe')).toHaveTextContent(/guitar:standard:\d+:false/);
    expect(screen.getByTestId('probe').textContent).not.toContain(':0:false');
  });
});
