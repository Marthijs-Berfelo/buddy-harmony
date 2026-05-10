import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Pages } from './pages';
import ScalePage from '../../modules/scale';
import { ChordPage, CagedPage } from '../layout/Content';
import Layout from '../layout/Layout';

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
