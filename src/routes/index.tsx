
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import EditorPage from '../pages/editor';
import NotFoundPage from '../pages/not-found';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
