
import React, { useEffect, useState } from 'react';
import { useFileTree } from '../context/file-tree-context';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const EditorContent: React.FC = () => {
  const { openFiles, activeFile, closeFile, setActiveFile, updateFileContent } = useFileTree();
  const [currentTab, setCurrentTab] = useState<string>('');

  useEffect(() => {
    if (activeFile) {
      setCurrentTab(activeFile.id);
    } else if (openFiles.length > 0) {
      setCurrentTab(openFiles[0].id);
      setActiveFile(openFiles[0]);
    }
  }, [activeFile, openFiles, setActiveFile]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    const file = openFiles.find(f => f.id === value);
    if (file) {
      setActiveFile(file);
    }
  };

  const handleEditorChange = (value: string) => {
    if (activeFile) {
      updateFileContent(activeFile.id, value);
    }
  };

  if (openFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p className="text-lg">No file open</p>
        <p className="text-sm mt-2">Select a file from the sidebar to start editing</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <div className="border-b flex overflow-x-auto">
          <TabsList className="bg-transparent justify-start h-auto p-0">
            {openFiles.map((file) => (
              <div key={file.id} className="flex items-center relative">
                <TabsTrigger 
                  value={file.id}
                  className={`data-[state=active]:bg-muted/50 data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 px-4 h-10 rounded-none`}
                >
                  {file.name}
                </TabsTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 absolute right-0 top-0 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(file.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </TabsList>
        </div>
        
        {openFiles.map((file) => (
          <TabsContent key={file.id} value={file.id} className="h-[calc(100%-42px)] mt-0">
            <ScrollArea className="h-full border rounded-md">
              <div className="flex">
                <div className="w-12 bg-muted/30 text-right pr-2 py-2 text-muted-foreground select-none">
                  {file.content?.split('\n').map((_, i) => (
                    <div key={i} className="text-xs">{i + 1}</div>
                  ))}
                </div>
                <Textarea
                  value={file.content || ''}
                  onChange={(e) => handleEditorChange(e.target.value)}
                  className="flex-1 min-h-[400px] font-mono text-sm border-none rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
                  style={{ height: '100%' }}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EditorContent;
