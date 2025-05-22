
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CardManagerProvider } from './context/card-manager-context';
import AppRoutes from './routes';
import MainLayout from './layouts/MainLayout';

/**
 * Main application component that sets up the router and global providers.
 */
function App() {
  return (
    <CardManagerProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </CardManagerProvider>
  );
}

export default App;
