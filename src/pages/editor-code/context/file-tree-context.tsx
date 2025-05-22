
import React, { createContext, useState, useContext } from 'react';

// Define file types
export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  language?: string;
  children?: FileItem[];
  isOpen?: boolean;
}

// Mock initial files structure
const initialFiles: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: 'src',
    isOpen: true,
    children: [
      {
        id: '2',
        name: 'App.tsx',
        type: 'file',
        path: 'src/App.tsx',
        language: 'typescript',
        content: 'import React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}\n\nexport default App;'
      },
      {
        id: '3',
        name: 'index.tsx',
        type: 'file',
        path: 'src/index.tsx',
        language: 'typescript',
        content: 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\n\nReactDOM.render(<App />, document.getElementById("root"));'
      },
      {
        id: '4',
        name: 'components',
        type: 'folder',
        path: 'src/components',
        isOpen: false,
        children: [
          {
            id: '5',
            name: 'Button.tsx',
            type: 'file',
            path: 'src/components/Button.tsx',
            language: 'typescript',
            content: 'import React from "react";\n\ninterface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n}\n\nconst Button: React.FC<ButtonProps> = ({ children, onClick }) => {\n  return <button onClick={onClick}>{children}</button>;\n};\n\nexport default Button;'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'public',
    type: 'folder',
    path: 'public',
    isOpen: false,
    children: [
      {
        id: '7',
        name: 'index.html',
        type: 'file',
        path: 'public/index.html',
        language: 'html',
        content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>React App</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>'
      }
    ]
  }
];

// Define context types
interface FileTreeContextType {
  files: FileItem[];
  activeFile: FileItem | null;
  openFiles: FileItem[];
  setActiveFile: (file: FileItem | null) => void;
  toggleFolder: (folderId: string) => void;
  openFile: (file: FileItem) => void;
  closeFile: (fileId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  createFile: (parentPath: string, fileName: string, type: 'file' | 'folder') => void;
  deleteFile: (fileId: string) => void;
}

// Create context with default values
const FileTreeContext = createContext<FileTreeContextType>({
  files: [],
  activeFile: null,
  openFiles: [],
  setActiveFile: () => {},
  toggleFolder: () => {},
  openFile: () => {},
  closeFile: () => {},
  updateFileContent: () => {},
  createFile: () => {},
  deleteFile: () => {}
});

// Context provider component
export const FileTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);

  // Toggle folder open/close
  const toggleFolder = (folderId: string) => {
    const updateFolderState = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === folderId) {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.children) {
          return { ...item, children: updateFolderState(item.children) };
        }
        return item;
      });
    };
    
    setFiles(updateFolderState(files));
  };

  // Open file in editor
  const openFile = (file: FileItem) => {
    if (file.type === 'file' && !openFiles.some(f => f.id === file.id)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file);
  };

  // Close file
  const closeFile = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    if (activeFile && activeFile.id === fileId) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
    }
  };

  // Update file content
  const updateFileContent = (fileId: string, content: string) => {
    const updateContent = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === fileId) {
          return { ...item, content };
        }
        if (item.children) {
          return { ...item, children: updateContent(item.children) };
        }
        return item;
      });
    };
    
    setFiles(updateContent(files));
    
    // Also update the content in openFiles
    setOpenFiles(openFiles.map(file => 
      file.id === fileId ? { ...file, content } : file
    ));
    
    // Update activeFile if it's the modified file
    if (activeFile && activeFile.id === fileId) {
      setActiveFile({ ...activeFile, content });
    }
  };

  // Create new file or folder
  const createFile = (parentPath: string, fileName: string, type: 'file' | 'folder') => {
    const newId = Date.now().toString();
    const newPath = parentPath ? `${parentPath}/${fileName}` : fileName;
    
    const newFile: FileItem = {
      id: newId,
      name: fileName,
      type,
      path: newPath,
      ...(type === 'folder' ? { children: [], isOpen: true } : { content: '', language: getLanguage(fileName) })
    };
    
    const addFileToTree = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.path === parentPath) {
          return {
            ...item,
            isOpen: true,
            children: [...(item.children || []), newFile]
          };
        }
        if (item.children) {
          return { ...item, children: addFileToTree(item.children) };
        }
        return item;
      });
    };
    
    if (parentPath === '') {
      setFiles([...files, newFile]);
    } else {
      setFiles(addFileToTree(files));
    }
  };

  // Delete file or folder
  const deleteFile = (fileId: string) => {
    const removeFileFromTree = (items: FileItem[]): FileItem[] => {
      return items.filter(item => {
        if (item.id === fileId) {
          return false;
        }
        if (item.children) {
          item.children = removeFileFromTree(item.children);
        }
        return true;
      });
    };
    
    setFiles(removeFileFromTree(files));
    
    // Remove from open files and set active file if needed
    if (openFiles.some(file => file.id === fileId)) {
      closeFile(fileId);
    }
  };

  // Helper to determine file language by extension
  const getLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop() || '';
    const extensionMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown'
    };
    return extensionMap[extension] || 'plaintext';
  };

  return (
    <FileTreeContext.Provider 
      value={{ 
        files, 
        activeFile, 
        openFiles,
        setActiveFile, 
        toggleFolder,
        openFile,
        closeFile,
        updateFileContent,
        createFile,
        deleteFile
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};

// Custom hook to use the file tree context
export const useFileTree = () => useContext(FileTreeContext);
