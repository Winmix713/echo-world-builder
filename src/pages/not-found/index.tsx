
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@heroui/react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-[#1e1e2e] to-[#0d0d21]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-white/70">Page not found</p>
      <Button
        as={Link}
        to="/"
        color="primary"
        variant="solid"
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
      >
        Return Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
