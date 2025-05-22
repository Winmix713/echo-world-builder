import React from 'react';
import { Input, Select, SelectItem, Switch, Divider } from "@heroui/react";
import { ColorPicker } from '../../color-picker';

interface BorderSettingsTabProps {
  cardState: any;
  updateCardState: (updates: Partial<any>) => void;
  handleBorderRadiusChange: (value: string, corner: string) => void;
}

export const BorderSettingsTab: React.FC<BorderSettingsTabProps> = ({
  cardState,
  updateCardState,
  handleBorderRadiusChange
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Card Border</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            type="text"
            label="Border Width" 
            value={cardState.cardBorderWidth}
            onValueChange={(value) => updateCardState({ cardBorderWidth: value })}
            endContent="px"
          />
          <Select
            label="Border Style"
            selectedKeys={[cardState.cardBorderStyle]}
            onChange={(e) => updateCardState({ cardBorderStyle: e.target.value })}
          >
            <SelectItem key="solid" value="solid">Solid</SelectItem>
            <SelectItem key="dashed" value="dashed">Dashed</SelectItem>
            <SelectItem key="dotted" value="dotted">Dotted</SelectItem>
            <SelectItem key="double" value="double">Double</SelectItem>
            <SelectItem key="groove" value="groove">Groove</SelectItem>
            <SelectItem key="ridge" value="ridge">Ridge</SelectItem>
            <SelectItem key="inset" value="inset">Inset</SelectItem>
            <SelectItem key="outset" value="outset">Outset</SelectItem>
          </Select>
          <div className="flex gap-2 items-end">
            <ColorPicker
              label="Border Color"
              value={cardState.cardBorderColor}
              onChange={(value) => updateCardState({ cardBorderColor: value })}
              className="flex-1"
            />
            <Input
              type="text"
              label="Opacity"
              value={cardState.cardBorderOpacity}
              onValueChange={(value) => updateCardState({ cardBorderOpacity: value })}
              className="w-24"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-medium">Border Radius</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Link corners</span>
              <Switch 
                isSelected={cardState.linkBorderRadius}
                onValueChange={(value) => updateCardState({ linkBorderRadius: value })}
                size="sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input 
              type="text"
              label="Top Left" 
              value={cardState.cardBorderRadiusTopLeft}
              onValueChange={(value) => handleBorderRadiusChange(value, "topLeft")}
            />
            <Input 
              type="text"
              label="Top Right" 
              value={cardState.cardBorderRadiusTopRight}
              onValueChange={(value) => handleBorderRadiusChange(value, "topRight")}
              isDisabled={cardState.linkBorderRadius}
            />
            <Input 
              type="text"
              label="Bottom Left" 
              value={cardState.cardBorderRadiusBottomLeft}
              onValueChange={(value) => handleBorderRadiusChange(value, "bottomLeft")}
              isDisabled={cardState.linkBorderRadius}
            />
            <Input 
              type="text"
              label="Bottom Right" 
              value={cardState.cardBorderRadiusBottomRight}
              onValueChange={(value) => handleBorderRadiusChange(value, "bottomRight")}
              isDisabled={cardState.linkBorderRadius}
            />
          </div>
          
          <Select
            label="Unit"
            selectedKeys={[cardState.cardBorderRadiusUnit]}
            onChange={(e) => updateCardState({ cardBorderRadiusUnit: e.target.value })}
            className="max-w-xs"
          >
            <SelectItem key="px" value="px">px</SelectItem>
            <SelectItem key="%" value="%">%</SelectItem>
            <SelectItem key="rem" value="rem">rem</SelectItem>
          </Select>
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Icon Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="text"
            label="Icon Size" 
            value={cardState.iconSize}
            onValueChange={(value) => updateCardState({ iconSize: value })}
            endContent="px"
          />
          <div className="flex gap-2 items-end">
            <Input 
              type="text"
              label="Border Radius" 
              value={cardState.iconBorderRadius}
              onValueChange={(value) => updateCardState({ iconBorderRadius: value })}
              className="flex-1"
            />
            <Select
              selectedKeys={[cardState.iconBorderRadiusUnit]}
              onChange={(e) => updateCardState({ iconBorderRadiusUnit: e.target.value })}
              className="w-24"
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            type="text"
            label="Border Width" 
            value={cardState.iconBorderWidth}
            onValueChange={(value) => updateCardState({ iconBorderWidth: value })}
            endContent="px"
          />
          <Select
            label="Border Style"
            selectedKeys={[cardState.iconBorderStyle]}
            onChange={(e) => updateCardState({ iconBorderStyle: e.target.value })}
          >
            <SelectItem key="solid" value="solid">Solid</SelectItem>
            <SelectItem key="dashed" value="dashed">Dashed</SelectItem>
            <SelectItem key="dotted" value="dotted">Dotted</SelectItem>
            <SelectItem key="double" value="double">Double</SelectItem>
            <SelectItem key="groove" value="groove">Groove</SelectItem>
            <SelectItem key="ridge" value="ridge">Ridge</SelectItem>
            <SelectItem key="inset" value="inset">Inset</SelectItem>
            <SelectItem key="outset" value="outset">Outset</SelectItem>
          </Select>
          <div className="flex gap-2 items-end">
            <ColorPicker
              label="Border Color"
              value={cardState.iconBorderColor}
              onChange={(value) => updateCardState({ iconBorderColor: value })}
              className="flex-1"
            />
            <Input
              type="text"
              label="Opacity"
              value={cardState.iconBorderOpacity}
              onValueChange={(value) => updateCardState({ iconBorderOpacity: value })}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};