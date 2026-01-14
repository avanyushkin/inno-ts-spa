import { useState } from 'react'
import './App.css'
import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import { RouterProvider } from '@tanstack/react-router';

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [count, setCount] = useState(0)

  return ( <RouterProvider router={router} /> );
}

export default App
