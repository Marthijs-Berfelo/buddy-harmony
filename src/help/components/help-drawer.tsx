import type { JSX } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useHelpDrawer } from '@/help/hooks/help-drawer-provider';
import { useHelpMarkdown } from '@/help/hooks/help-markdown';
import { Markdown } from '@/components/ui/markdown';
import { HelpSection } from '@/help/content-types';

function HelpDrawerContent({ section }: { section: HelpSection }): JSX.Element {
  const content = useHelpMarkdown(section);
  return <Markdown content={content} />;
}

function HelpDrawer(): JSX.Element | null {
  const { isOpen, activeSection, close } = useHelpDrawer();

  if (!activeSection) {
    return null;
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 shadow-lg md:w-[260px]"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">Help</DialogPrimitive.Title>
          <DialogPrimitive.Close
            aria-label="close"
            className="mb-4 flex size-8 items-center justify-center rounded-lg hover:bg-muted"
          >
            <FontAwesomeIcon icon={faXmark} />
          </DialogPrimitive.Close>
          <HelpDrawerContent section={activeSection} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { HelpDrawer };
