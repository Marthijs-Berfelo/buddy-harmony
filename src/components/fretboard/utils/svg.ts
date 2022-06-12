export const horizontalLine = (x: number, y: number, length: number, width: number): string =>
  `M ${x},${y + width / 2} h ${length}`;

export const verticalLine = (x: number, y: number, length: number, width: number): string =>
  `M ${x + width / 2},${y} v ${length}`;
