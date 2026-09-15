import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createRef } from 'react';
import { Toolbar } from '../toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SettingsProvider } from 'hooks';
import { Pages } from 'routing/pages';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderToolbar = (printDisabled = false) => {
  const printRef = createRef<HTMLDivElement>();
  return render(
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <SettingsProvider>
          <div ref={printRef} />
          <Toolbar
            page={Pages.CHORD}
            printRef={printRef}
            printDisabled={printDisabled}
            tools={[<div key="tool">tool</div>]}
          />
        </SettingsProvider>
      </TooltipProvider>
    </I18nextProvider>
  );
};

describe('Toolbar', () => {
  test('renders the page title, tools, and a print button', () => {
    renderToolbar();

    expect(screen.getByText('tool')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'print.tool-tip' })).toBeInTheDocument();
  });

  test('disables the print button when printDisabled is true', () => {
    renderToolbar(true);

    expect(screen.getByRole('button', { name: 'print.tool-tip' })).toBeDisabled();
  });

  test('does not throw when the print button is clicked', async () => {
    const user = userEvent.setup();
    renderToolbar();

    await expect(
      user.click(screen.getByRole('button', { name: 'print.tool-tip' }))
    ).resolves.not.toThrow();
  });
});
