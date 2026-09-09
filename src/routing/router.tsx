import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Pages } from './pages';
import { Layout } from 'layout';
import { lazy } from 'react';
import { withMinDelay } from 'lib/delay';

const FRETBOARD_LOADER_MIN_DISPLAY_MS = 3000;

const ScalePage = lazy(() =>
  withMinDelay(import('modules/scale'), FRETBOARD_LOADER_MIN_DISPLAY_MS).then((module) => ({
    default: module.ScalePage,
  }))
);
const ChordPage = lazy(() =>
  withMinDelay(import('modules/chord'), FRETBOARD_LOADER_MIN_DISPLAY_MS).then((module) => ({
    default: module.ChordPage,
  }))
);
const CagedPage = lazy(() =>
  withMinDelay(import('modules/caged'), FRETBOARD_LOADER_MIN_DISPLAY_MS).then((module) => ({
    default: module.CagedPage,
  }))
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: Pages.SCALE, element: <ScalePage /> },
        { path: Pages.CHORD, element: <ChordPage /> },
        { path: Pages.CAGED, element: <CagedPage /> },
        { path: '*', element: <Navigate to={Pages.SCALE} replace /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
