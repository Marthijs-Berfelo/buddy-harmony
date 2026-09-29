import { render, screen } from '@testing-library/react';
import { Markdown } from '../markdown';

describe('Markdown', () => {
  test('renders headings, paragraphs, and lists from markdown source', () => {
    const content = [
      '# Title',
      '',
      'A paragraph with a [link](https://example.com).',
      '',
      '- one',
      '- two',
    ].join('\n');

    render(<Markdown content={content} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText(/A paragraph with a/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'link' })).toHaveAttribute(
      'href',
      'https://example.com'
    );
    expect(screen.getByRole('list')).toContainElement(screen.getByText('one'));
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  test('applies the prose wrapper class for typography styling', () => {
    render(<Markdown content="hello" />);

    expect(screen.getByText('hello').parentElement).toHaveClass('prose');
  });

  test('does not render raw HTML tags embedded in the source', () => {
    render(<Markdown content={'<script>window.__xss = true;</script>text'} />);

    expect(screen.getByText(/text/)).toBeInTheDocument();
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });
});
