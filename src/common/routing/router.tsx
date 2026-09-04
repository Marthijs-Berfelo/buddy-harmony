import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Pages } from './pages';
import { Layout } from '../layout';
import { lazy } from 'react';

const ScalePage = lazy(() => import('@/modules/scale'));
const ChordPage = lazy(() => import('@/modules/chord'));
const CagedPage = lazy(() => import('@/modules/caged'));

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
