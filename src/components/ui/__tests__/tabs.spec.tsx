import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

describe('Tabs', () => {
  const renderTabs = () =>
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content one</TabsContent>
        <TabsContent value="two">Content two</TabsContent>
      </Tabs>
    );

  test('shows the content for the default tab', () => {
    renderTabs();

    expect(screen.getByText('Content one')).toBeVisible();
    expect(screen.queryByText('Content two')).not.toBeInTheDocument();
  });

  test('clicking a tab trigger switches the visible content', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByText('Content two')).toBeVisible();
    expect(screen.queryByText('Content one')).not.toBeInTheDocument();
  });

  test('marks the active tab trigger as selected', async () => {
    const user = userEvent.setup();
    renderTabs();

    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'false');
  });
});
