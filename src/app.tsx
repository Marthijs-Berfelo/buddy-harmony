import { RouterProvider } from 'react-router-dom';
import { router } from 'routing/router';

export function App() {
  return <RouterProvider router={router} useTransitions={false} />;
}
