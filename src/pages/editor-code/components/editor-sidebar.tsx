
import React, { useState } from 'react';
import { useFileTree } from '../context/file-tree-context';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Plus, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface FileTreeItemProps {
  item: any;
  depth: number;
}

const EditorSidebar: React.FC = () => {
  const { files, createFile } = useFileTree();
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [newItemParentPath, setNewItemParentPath] = useState('');
  const [newItemName, setNewItemName] = useState('');

  const handleCreateNew = (type: 'file' | 'folder') => {
    setNewItemType(type);
    setNewItemParentPath(''); // Root level
    setNewItemName('');
    setShowNewItemDialog(true);
  };

  const handleCreateNewItem = () => {
    if (newItemName.trim()) {
      createFile(newItemParentPath, newItemName, newItemType);
      setShowNewItemDialog(false);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-sm font-semibold">EXPLORER</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCreateNew('file')}>
            <Plus className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleCreateNew('file')}>New File</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNew('folder')}>New Folder</DropdownMenuItem>
              <DropdownMenuItem>Refresh Explorer</DropdownMenuItem>
              <DropdownMenuItem>Collapse All</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-0.5">
        {files.map(item => (
          <FileTreeItem key={item.id} item={item} depth={0} />
        ))}
      </div>

      <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New {newItemType === 'file' ? 'File' : 'Folder'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input 
              placeholder={`Enter ${newItemType} name...`}
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowNewItemDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateNewItem}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FileTreeItem: React.FC<FileTreeItemProps> = ({ item, depth }) => {
  const { toggleFolder, openFile, createFile, deleteFile } = useFileTree();
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [newItemName, setNewItemName] = useState('');

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'folder') {
      toggleFolder(item.id);
    } else {
      openFile(item);
    }
  };

  const handleCreateNew = (type: 'file' | 'folder', e: React.MouseEvent) => {
    e.stopPropagation();
    setNewItemType(type);
    setNewItemName('');
    setShowNewItemDialog(true);
  };

  const handleCreateNewItem = () => {
    if (newItemName.trim()) {
      createFile(item.path, newItemName, newItemType);
      setShowNewItemDialog(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFile(item.id);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div 
            className="flex items-center py-1 px-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
            style={{ paddingLeft: `${depth * 8 + 4}px` }}
            onClick={handleItemClick}
          >
            {item.type === 'folder' && (
              item.isOpen ? 
                <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" /> : 
                <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
            )}
            
            <span className="mr-1.5">
              {item.type === 'folder' ? (
                item.isOpen ? 
                  <FolderOpen className="h-4 w-4 text-yellow-400" /> : 
                  <Folder className="h-4 w-4 text-yellow-400" />
              ) : (
                <File className="h-4 w-4 text-blue-400" />
              )}
            </span>
            
            <span className="truncate">{item.name}</span>
          </div>
        </ContextMenuTrigger>
        
        <ContextMenuContent className="w-48">
          {item.type === 'folder' && (
            <>
              <ContextMenuItem onClick={(e) => handleCreateNew('file', e)}>
                New File
              </ContextMenuItem>
              <ContextMenuItem onClick={(e) => handleCreateNew('folder', e)}>
                New Folder
              </ContextMenuItem>
              <ContextMenuSeparator />
            </>
          )}
          <ContextMenuItem onClick={handleItemClick}>
            {item.type === 'folder' ? (
              item.isOpen ? 'Collapse' : 'Expand'
            ) : (
              'Open'
            )}
          </ContextMenuItem>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem className="text-red-500" onClick={handleDelete}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      
      {item.type === 'folder' && item.isOpen && item.children && (
        <div>
          {item.children.map((child: any) => (
            <FileTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}

      <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New {newItemType === 'file' ? 'File' : 'Folder'} in {item.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input 
              placeholder={`Enter ${newItemType} name...`}
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowNewItemDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateNewItem}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditorSidebar;
