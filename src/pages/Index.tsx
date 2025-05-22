
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Extension Cards</h1>
        <p className="text-xl text-white/80">
          Create and customize beautiful extension cards with our powerful visual editor.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Link to="/editor">
              Open Card Editor
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/code-editor">
              Open Code Editor
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
