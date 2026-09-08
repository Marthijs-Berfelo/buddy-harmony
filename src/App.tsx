import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from '@/common/routing/router';

function App() {
  return <RouterProvider router={router} useTransitions={false} />;
}

export default App;
