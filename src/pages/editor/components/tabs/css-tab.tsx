import React from 'react';
import { Button, Checkbox } from "@heroui/react";
import { Icon } from '@iconify/react';

interface CssTabProps {
  cardState: any;
  updateCardState: (updates: Partial<any>) => void;
  generateCssCode: () => string;
}

export const CssTab: React.FC<CssTabProps> = ({
  cardState,
  updateCardState,
  generateCssCode
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">CSS Code</h3>
          <div className="flex gap-2">
            <Checkbox 
              isSelected={cardState.minifyCss}
              onValueChange={(value) => updateCardState({ minifyCss: value })}
              size="sm"
            >
              Minify
            </Checkbox>
            <Checkbox 
              isSelected={cardState.includePrefixes}
              onValueChange={(value) => updateCardState({ includePrefixes: value })}
              size="sm"
            >
              Add Prefixes
            </Checkbox>
            <Button 
              color="primary" 
              endContent={<Icon icon="lucide:clipboard" />}
              onPress={() => navigator.clipboard.writeText(generateCssCode())}
            >
              Copy to Clipboard
            </Button>
          </div>
        </div>
        <div className="bg-[#0d0d21] p-4 rounded-lg border border-white/10 overflow-auto max-h-[400px]">
          <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono">
            {generateCssCode()}
          </pre>
        </div>
      </div>
    </div>
  );
};