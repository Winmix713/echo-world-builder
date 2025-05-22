
import React from 'react';
import { 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';
import HomePage from '../pages/home';
import EditorPage from '../pages/editor';
import NotFoundPage from '../pages/not-found';

/**
 * Application routing configuration.
 * Defines all available routes and their corresponding components.
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
