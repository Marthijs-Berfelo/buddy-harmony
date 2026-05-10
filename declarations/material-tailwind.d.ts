// Material Tailwind v2 was compiled against React 18 types.
// React 19 changed pointer/resize event handler signatures, causing type errors.
// This shim makes the affected props optional to restore compatibility.
import '@material-tailwind/react';

declare module '@material-tailwind/react' {
  interface ButtonProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface IconButtonProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface TypographyProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface MenuProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface MenuHandlerProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface MenuListProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface MenuItemProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface TooltipProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface SelectProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
  interface OptionProps {
    placeholder?: unknown;
    onResize?: unknown;
    onResizeCapture?: unknown;
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
}
