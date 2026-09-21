import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../switch';

describe('Switch', () => {
  test('renders unchecked by default and reflects the checked prop', () => {
    render(<Switch checked={false} onCheckedChange={vi.fn()} aria-label="triad toggle" />);

    expect(screen.getByRole('switch', { name: 'triad toggle' })).not.toBeChecked();
  });

  test('renders checked when checked is true', () => {
    render(<Switch checked={true} onCheckedChange={vi.fn()} aria-label="triad toggle" />);

    expect(screen.getByRole('switch', { name: 'triad toggle' })).toBeChecked();
  });

  test('calls onCheckedChange with the flipped value when clicked', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} aria-label="triad toggle" />);

    await user.click(screen.getByRole('switch', { name: 'triad toggle' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
