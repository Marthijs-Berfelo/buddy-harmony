import { RouterProvider } from 'react-router-dom';
import { router } from 'routing/router';

function App() {
  return <RouterProvider router={router} useTransitions={false} />;
}

export default App;
