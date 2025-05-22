
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorSidebar from './components/editor-sidebar';
import EditorContent from './components/editor-content';
import EditorStatusBar from './components/editor-status-bar';
import EditorToolbar from './components/editor-toolbar';
import { FileTreeProvider } from './context/file-tree-context';

const CodeEditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("files");

  return (
    <div className="h-[calc(100vh-80px)] bg-background rounded-lg border overflow-hidden">
      <FileTreeProvider>
        <EditorToolbar />
        
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100%-80px)]">
          {/* Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
            <Tabs defaultValue="files" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="extensions">Extensions</TabsTrigger>
              </TabsList>
              <TabsContent value="files" className="h-[calc(100vh-200px)]">
                <ScrollArea className="h-full">
                  <EditorSidebar />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="search" className="p-4">
                <div className="text-sm text-muted-foreground">
                  Search functionality will be implemented here
                </div>
              </TabsContent>
              <TabsContent value="extensions" className="p-4">
                <div className="text-sm text-muted-foreground">
                  Extensions management will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Main content area */}
          <ResizablePanel defaultSize={80}>
            <EditorContent />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <EditorStatusBar />
      </FileTreeProvider>
    </div>
  );
};

export default CodeEditorPage;
