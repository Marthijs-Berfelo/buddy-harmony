import type { JSX } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

function Markdown({ content, className }: MarkdownProps): JSX.Element {
  return (
    <div className={cn('prose', className)}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export { Markdown, type MarkdownProps };
