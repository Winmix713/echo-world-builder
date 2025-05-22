import React from 'react';
import { Button, Select, SelectItem, Badge, Tooltip } from "@heroui/react";
import { Icon } from '@iconify/react';
import { Card } from '../../../context/card-manager-context';

interface EditorHeaderProps {
  cards: Card[];
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
  activeCard: Card | undefined;
  onNewCard: () => void;
  onDeleteCard: (id: string) => void;
  onToggleActive: (id: string) => void;
  onSave: () => void;
  onReset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  cards,
  activeCardId,
  setActiveCardId,
  activeCard,
  onNewCard,
  onDeleteCard,
  onToggleActive,
  onSave,
  onReset,
  undo,
  redo,
  canUndo,
  canRedo
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Card Style Editor</h1>
        <Select
          aria-label="Select Card"
          placeholder="Select Card"
          selectedKeys={activeCardId ? [activeCardId] : []}
          onChange={(e) => setActiveCardId(e.target.value)}
          className="w-64"
        >
          {cards.map((card) => (
            <SelectItem key={card.id} value={card.id}>
              <div className="flex items-center gap-2">
                <span>{card.title}</span>
                {!card.isActive && (
                  <Badge color="warning" variant="flat" size="sm">Inactive</Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="flat"
          color="success"
          startContent={<Icon icon="lucide:plus" />}
          onPress={onNewCard}
        >
          New Card
        </Button>
        
        <Button
          variant="flat"
          color="danger"
          startContent={<Icon icon="lucide:trash-2" />}
          isDisabled={!activeCardId}
          onPress={() => {
            if (activeCardId) {
              onDeleteCard(activeCardId);
            }
          }}
        >
          Delete
        </Button>
        
        <Button
          variant="flat"
          color="warning"
          startContent={<Icon icon={activeCard?.isActive ? "lucide:eye-off" : "lucide:eye"} />}
          isDisabled={!activeCardId}
          onPress={() => {
            if (activeCardId) {
              onToggleActive(activeCardId);
            }
          }}
        >
          {activeCard?.isActive ? "Deactivate" : "Activate"}
        </Button>
        
        <Tooltip content="Undo" placement="bottom">
          <Button 
            isIconOnly 
            variant="flat" 
            isDisabled={!canUndo}
            onPress={undo}
          >
            <Icon icon="lucide:undo-2" className="text-white/80" />
          </Button>
        </Tooltip>
        
        <Tooltip content="Redo" placement="bottom">
          <Button 
            isIconOnly 
            variant="flat" 
            isDisabled={!canRedo}
            onPress={redo}
          >
            <Icon icon="lucide:redo-2" className="text-white/80" />
          </Button>
        </Tooltip>
        
        <Button 
          variant="solid" 
          color="primary"
          startContent={<Icon icon="lucide:save" />}
          onPress={onSave}
          isDisabled={!activeCardId}
        >
          Save
        </Button>
        
        <Button 
          variant="flat" 
          color="default"
          startContent={<Icon icon="lucide:refresh-ccw" />}
          onPress={onReset}
          isDisabled={!activeCardId}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};