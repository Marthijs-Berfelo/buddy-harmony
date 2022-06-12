import React, { Fragment } from 'react';

const DebugGrid = () => (
  <Fragment>
    <defs>
      <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
        <path d="M 1 0 L 0 0 0 1" fill="none" stroke="gray" strokeWidth="0.1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </Fragment>
);

export default DebugGrid;
