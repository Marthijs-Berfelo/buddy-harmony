import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardContent } from '../card';

describe('Card', () => {
  test('renders the header and content when open (default)', () => {
    render(
      <Card>
        <CardHeader>Legend</CardHeader>
        <CardContent>
          <p>body</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Legend')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeVisible();
  });

  test('starts collapsed when defaultOpen is false', () => {
    render(
      <Card defaultOpen={false}>
        <CardHeader>Legend</CardHeader>
        <CardContent>
          <p>body</p>
        </CardContent>
      </Card>
    );

    expect(screen.queryByText('body')).not.toBeInTheDocument();
  });

  test('clicking the header toggles the content visibility', async () => {
    const user = userEvent.setup();
    render(
      <Card>
        <CardHeader>Legend</CardHeader>
        <CardContent>
          <p>body</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('body')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Legend' }));
    expect(screen.queryByText('body')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Legend' }));
    expect(screen.getByText('body')).toBeVisible();
  });

  test('the header button reflects open state via aria-expanded', async () => {
    const user = userEvent.setup();
    render(
      <Card>
        <CardHeader>Legend</CardHeader>
        <CardContent>
          <p>body</p>
        </CardContent>
      </Card>
    );

    const trigger = screen.getByRole('button', { name: 'Legend' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
