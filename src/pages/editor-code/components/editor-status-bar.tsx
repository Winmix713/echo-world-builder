
import React from 'react';
import { useFileTree } from '../context/file-tree-context';

const EditorStatusBar: React.FC = () => {
  const { activeFile } = useFileTree();
  
  const getLanguageDisplay = (language?: string): string => {
    const displayMap: Record<string, string> = {
      'typescript': 'TypeScript',
      'javascript': 'JavaScript',
      'html': 'HTML',
      'css': 'CSS',
      'json': 'JSON',
      'markdown': 'Markdown',
      'plaintext': 'Plain Text'
    };
    
    return language ? (displayMap[language] || language) : 'Plain Text';
  };
  
  return (
    <div className="h-6 bg-muted/50 border-t px-4 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center space-x-4">
        <span>{activeFile ? activeFile.path : 'No file selected'}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span>{activeFile ? getLanguageDisplay(activeFile.language) : ''}</span>
        <span>UTF-8</span>
        <span>LF</span>
      </div>
    </div>
  );
};

export default EditorStatusBar;
