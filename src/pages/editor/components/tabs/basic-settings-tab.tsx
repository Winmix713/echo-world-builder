import React from 'react';
import { Input, Select, SelectItem, Checkbox, Divider, Button, Image } from "@heroui/react";
import { Icon } from '@iconify/react';

interface BasicSettingsTabProps {
  cardState: any;
  updateCardState: (updates: Partial<any>) => void;
  addToHistory: (state: any) => void;
  cardTypes: { key: string; label: string }[];
  handleIconImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicSettingsTab: React.FC<BasicSettingsTabProps> = ({
  cardState,
  updateCardState,
  addToHistory,
  cardTypes,
  handleIconImageUpload,
  handleContentImageUpload
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Card Type</h3>
        <Select
          label="Card Type"
          placeholder="Select a card type"
          selectedKeys={[cardState.selectedType]}
          onChange={(e) => {
            // Save current state to history before changing type
            addToHistory({ selectedType: cardState.selectedType, title: cardState.title, description: cardState.description });
            updateCardState({ selectedType: e.target.value });
          }}
          className="max-w-xs"
        >
          {cardTypes.map((type) => (
            <SelectItem key={type.key} value={type.key}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Content</h3>
        <Input 
          label="Title" 
          value={cardState.title} 
          onValueChange={(value) => {
            addToHistory({ title: cardState.title });
            updateCardState({ title: value });
          }}
          className="max-w-md"
        />
        <Input 
          label="Description" 
          value={cardState.description} 
          onValueChange={(value) => {
            addToHistory({ description: cardState.description });
            updateCardState({ description: value });
          }}
          className="max-w-md"
        />
        <Input 
          label="Animation Delay" 
          value={cardState.delay} 
          onValueChange={(value) => {
            addToHistory({ delay: cardState.delay });
            updateCardState({ delay: value });
          }}
          className="max-w-xs"
          description="Format: 500ms, 1s, etc."
        />
      </div>
      
      <Divider />
      
      {/* Image upload section for icon */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Icon Image</h3>
        <div className="flex items-center gap-4">
          <Checkbox 
            isSelected={cardState.useCustomIcon}
            onValueChange={(value) => updateCardState({ useCustomIcon: value })}
          >
            Use custom icon image
          </Checkbox>
          
          {cardState.useCustomIcon && (
            <Button
              variant="flat"
              color="primary"
              size="sm"
              onPress={() => document.getElementById('icon-image-upload')?.click()}
            >
              Upload Image
            </Button>
          )}
        </div>
        
        <input
          id="icon-image-upload"
          type="file"
          accept="image/*"
          onChange={handleIconImageUpload}
          className="hidden"
        />
        
        {cardState.useCustomIcon && cardState.iconImage && (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/20">
            <Image
              src={cardState.iconImage}
              alt="Custom icon"
              className="w-full h-full object-cover"
            />
            <Button
              isIconOnly
              size="sm"
              color="danger"
              variant="solid"
              className="absolute top-1 right-1"
              onPress={() => {
                updateCardState({
                  iconImage: null,
                  useCustomIcon: false
                });
              }}
            >
              <Icon icon="lucide:x" size={16} />
            </Button>
          </div>
        )}
      </div>
      
      {/* Image upload section for content */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Content Image</h3>
        <div className="flex items-center gap-4">
          <Checkbox 
            isSelected={cardState.useCustomContent}
            onValueChange={(value) => updateCardState({ useCustomContent: value })}
          >
            Use custom content image
          </Checkbox>
          
          {cardState.useCustomContent && (
            <Button
              variant="flat"
              color="primary"
              size="sm"
              onPress={() => document.getElementById('content-image-upload')?.click()}
            >
              Upload Image
            </Button>
          )}
        </div>
        
        <input
          id="content-image-upload"
          type="file"
          accept="image/*"
          onChange={handleContentImageUpload}
          className="hidden"
        />
        
        {cardState.useCustomContent && cardState.contentImage && (
          <div className="relative w-full max-w-md h-40 rounded-xl overflow-hidden border border-white/20">
            <Image
              src={cardState.contentImage}
              alt="Custom content"
              className="w-full h-full object-cover"
            />
            <Button
              isIconOnly
              size="sm"
              color="danger"
              variant="solid"
              className="absolute top-1 right-1"
              onPress={() => {
                updateCardState({
                  contentImage: null,
                  useCustomContent: false
                });
              }}
            >
              <Icon icon="lucide:x" size={16} />
            </Button>
          </div>
        )}
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Dimensions & Position</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2 items-end">
            <Input 
              type="text"
              label="Width" 
              value={cardState.cardWidth}
              onValueChange={(value) => updateCardState({ cardWidth: value })}
              className="flex-1"
            />
            <Select
              selectedKeys={[cardState.cardWidthUnit]}
              onChange={(e) => updateCardState({ cardWidthUnit: e.target.value })}
              className="w-24"
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
            </Select>
          </div>
          <div className="flex gap-2 items-end">
            <Input 
              type="text"
              label="Height" 
              value={cardState.cardHeight}
              onValueChange={(value) => updateCardState({ cardHeight: value })}
              className="flex-1"
            />
            <Select
              selectedKeys={[cardState.cardHeightUnit]}
              onChange={(e) => updateCardState({ cardHeightUnit: e.target.value })}
              className="w-24"
              isDisabled={cardState.cardHeight === "auto"}
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2 items-end">
            <Input 
              type="text"
              label="Padding" 
              value={cardState.cardPadding}
              onValueChange={(value) => updateCardState({ cardPadding: value })}
              className="flex-1"
            />
            <Select
              selectedKeys={[cardState.cardPaddingUnit]}
              onChange={(e) => updateCardState({ cardPaddingUnit: e.target.value })}
              className="w-24"
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
            </Select>
          </div>
          <Select
            label="Position"
            selectedKeys={[cardState.positionType]}
            onChange={(e) => updateCardState({ positionType: e.target.value })}
            className="max-w-xs"
          >
            <SelectItem key="relative" value="relative">Relative</SelectItem>
            <SelectItem key="absolute" value="absolute">Absolute</SelectItem>
            <SelectItem key="fixed" value="fixed">Fixed</SelectItem>
            <SelectItem key="sticky" value="sticky">Sticky</SelectItem>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="text"
            label="Z-Index" 
            value={cardState.zIndex}
            onValueChange={(value) => updateCardState({ zIndex: value })}
            className="max-w-xs"
          />
          <div>
            <p className="text-sm mb-1">Opacity: {cardState.cardOpacity}%</p>
            <div className="max-w-md">
              <input
                type="range"
                min="0"
                max="100"
                value={cardState.cardOpacity}
                onChange={(e) => updateCardState({ cardOpacity: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Animation Settings</h3>
        <div className="flex flex-col gap-2">
          <Checkbox 
            isSelected={cardState.enableHoverEffects}
            onValueChange={(value) => {
              addToHistory({ enableHoverEffects: cardState.enableHoverEffects });
              updateCardState({ enableHoverEffects: value });
            }}
          >
            Enable hover effects
          </Checkbox>
          <Checkbox 
            isSelected={cardState.enableAnimations}
            onValueChange={(value) => {
              addToHistory({ enableAnimations: cardState.enableAnimations });
              updateCardState({ enableAnimations: value });
            }}
          >
            Enable animations
          </Checkbox>
        </div>
      </div>
    </div>
  );
};