
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Copy, 
  Scissors, 
  Clipboard, 
  Undo, 
  Redo, 
  RefreshCcw, 
  Search, 
  Settings 
} from "lucide-react";

const EditorToolbar: React.FC = () => {
  return (
    <div className="p-2 border-b flex items-center justify-between">
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" title="Save">
          <Save className="h-4 w-4" />
        </Button>
        <div className="border-r mx-1 h-4"></div>
        <Button variant="ghost" size="icon" title="Undo">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Redo">
          <Redo className="h-4 w-4" />
        </Button>
        <div className="border-r mx-1 h-4"></div>
        <Button variant="ghost" size="icon" title="Cut">
          <Scissors className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Copy">
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Paste">
          <Clipboard className="h-4 w-4" />
        </Button>
        <div className="border-r mx-1 h-4"></div>
        <Button variant="ghost" size="icon" title="Find">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Replace">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <div>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
