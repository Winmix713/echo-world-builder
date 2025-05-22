import React from 'react';
import { Input, Divider } from "@heroui/react";
import { ColorPicker } from '../../color-picker';

interface BackgroundTabProps {
  cardState: any;
  updateCardState: (updates: Partial<any>) => void;
  addToHistory: (state: any) => void;
}

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  cardState,
  updateCardState,
  addToHistory
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Card Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ColorPicker
              label="Gradient From Color" 
              value={cardState.bgGradientFrom}
              onChange={(value) => {
                addToHistory({ bgGradientFrom: cardState.bgGradientFrom });
                updateCardState({ bgGradientFrom: value });
              }}
            />
          </div>
          <div>
            <Input 
              type="text"
              label="Gradient From Opacity" 
              value={cardState.bgOpacityFrom}
              onValueChange={(value) => {
                addToHistory({ bgOpacityFrom: cardState.bgOpacityFrom });
                updateCardState({ bgOpacityFrom: value });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ColorPicker
              label="Gradient To Color" 
              value={cardState.bgGradientTo}
              onChange={(value) => {
                addToHistory({ bgGradientTo: cardState.bgGradientTo });
                updateCardState({ bgGradientTo: value });
              }}
            />
          </div>
          <div>
            <Input 
              type="text"
              label="Gradient To Opacity" 
              value={cardState.bgOpacityTo}
              onValueChange={(value) => {
                addToHistory({ bgOpacityTo: cardState.bgOpacityTo });
                updateCardState({ bgOpacityTo: value });
              }}
            />
          </div>
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Icon Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            label="Gradient From" 
            value={cardState.iconGradientFrom}
            onChange={(value) => {
              addToHistory({ iconGradientFrom: cardState.iconGradientFrom });
              updateCardState({ iconGradientFrom: value });
            }}
          />
          <ColorPicker
            label="Gradient To" 
            value={cardState.iconGradientTo}
            onChange={(value) => {
              addToHistory({ iconGradientTo: cardState.iconGradientTo });
              updateCardState({ iconGradientTo: value });
            }}
          />
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Card Image Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorPicker
            label="Gradient From" 
            value={cardState.cardImageGradientFrom}
            onChange={(value) => {
              addToHistory({ cardImageGradientFrom: cardState.cardImageGradientFrom });
              updateCardState({ cardImageGradientFrom: value });
            }}
          />
          <ColorPicker
            label="Gradient Via" 
            value={cardState.cardImageGradientVia}
            onChange={(value) => {
              addToHistory({ cardImageGradientVia: cardState.cardImageGradientVia });
              updateCardState({ cardImageGradientVia: value });
            }}
          />
          <ColorPicker
            label="Gradient To" 
            value={cardState.cardImageGradientTo}
            onChange={(value) => {
              addToHistory({ cardImageGradientTo: cardState.cardImageGradientTo });
              updateCardState({ cardImageGradientTo: value });
            }}
          />
        </div>
      </div>
    </div>
  );
};