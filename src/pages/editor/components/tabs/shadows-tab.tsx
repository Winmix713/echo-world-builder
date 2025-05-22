import React from 'react';
import { Input, Checkbox, Divider, Switch } from "@heroui/react";
import { ColorPicker } from '../../color-picker';

interface ShadowsTabProps {
  cardState: any;
  updateCardState: (updates: Partial<any>) => void;
  addToHistory: (state: any) => void;
}

export const ShadowsTab: React.FC<ShadowsTabProps> = ({
  cardState,
  updateCardState,
  addToHistory
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Primary Shadow</h3>
        <div className="flex items-center gap-2 mb-4">
          <Checkbox 
            isSelected={cardState.shadowInset}
            onValueChange={(value) => updateCardState({ shadowInset: value })}
          >
            Inset Shadow
          </Checkbox>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="text"
            label="X Offset" 
            value={cardState.shadowX}
            onValueChange={(value) => updateCardState({ shadowX: value })}
            endContent="px"
          />
          <Input 
            type="text"
            label="Y Offset" 
            value={cardState.shadowY}
            onValueChange={(value) => updateCardState({ shadowY: value })}
            endContent="px"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="text"
            label="Blur Radius" 
            value={cardState.shadowBlur}
            onValueChange={(value) => updateCardState({ shadowBlur: value })}
            endContent="px"
          />
          <Input 
            type="text"
            label="Spread Radius" 
            value={cardState.shadowSpread}
            onValueChange={(value) => updateCardState({ shadowSpread: value })}
            endContent="px"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            label="Shadow Color" 
            value={cardState.shadowColor}
            onChange={(value) => {
              addToHistory({ shadowColor: cardState.shadowColor });
              updateCardState({ shadowColor: value });
            }}
          />
          <Input 
            type="text"
            label="Shadow Opacity" 
            value={cardState.shadowOpacity}
            onValueChange={(value) => {
              addToHistory({ shadowOpacity: cardState.shadowOpacity });
              updateCardState({ shadowOpacity: value });
            }}
          />
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Secondary Shadow</h3>
          <Switch 
            isSelected={cardState.useSecondShadow}
            onValueChange={(value) => updateCardState({ useSecondShadow: value })}
          >
            Enable
          </Switch>
        </div>
        
        {cardState.useSecondShadow && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Checkbox 
                isSelected={cardState.shadow2Inset}
                onValueChange={(value) => updateCardState({ shadow2Inset: value })}
              >
                Inset Shadow
              </Checkbox>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                type="text"
                label="X Offset" 
                value={cardState.shadow2X}
                onValueChange={(value) => updateCardState({ shadow2X: value })}
                endContent="px"
              />
              <Input 
                type="text"
                label="Y Offset" 
                value={cardState.shadow2Y}
                onValueChange={(value) => updateCardState({ shadow2Y: value })}
                endContent="px"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                type="text"
                label="Blur Radius" 
                value={cardState.shadow2Blur}
                onValueChange={(value) => updateCardState({ shadow2Blur: value })}
                endContent="px"
              />
              <Input 
                type="text"
                label="Spread Radius" 
                value={cardState.shadow2Spread}
                onValueChange={(value) => updateCardState({ shadow2Spread: value })}
                endContent="px"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPicker
                label="Shadow Color" 
                value={cardState.shadow2Color}
                onChange={(value) => updateCardState({ shadow2Color: value })}
              />
              <Input 
                type="text"
                label="Shadow Opacity" 
                value={cardState.shadow2Opacity}
                onValueChange={(value) => updateCardState({ shadow2Opacity: value })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};