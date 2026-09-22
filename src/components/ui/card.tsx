import * as React from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Card({
  className,
  defaultOpen = true,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="card"
      defaultOpen={defaultOpen}
      className={cn(
        'min-w-72 rounded-xl border border-border bg-card shadow-xs md:min-w-96',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="card-header"
      className={cn(
        'flex w-full items-center justify-between px-4 py-2 text-left font-bold text-card-foreground',
        className
      )}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="card-content"
      className={cn('px-4 pb-4', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent };
