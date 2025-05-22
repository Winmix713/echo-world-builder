import React from 'react';
import { Icon } from '@iconify/react';

export interface ExtensionCardProps {
  type: 'obsidian' | 'figma' | 'redis' | 'terminal' | 'docker';
  title: string;
  description: string;
  delay: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  customContent?: string | null; // Add custom content image
  cardStyles?: { // Add custom card styles
    bgGradientFrom?: string;
    bgGradientTo?: string;
    bgOpacityFrom?: string;
    bgOpacityTo?: string;
    iconGradientFrom?: string;
    iconGradientTo?: string;
    cardImageGradientFrom?: string;
    cardImageGradientVia?: string;
    cardImageGradientTo?: string;
    shadowColor?: string;
    shadowOpacity?: string;
    enableHoverEffects?: boolean;
    enableAnimations?: boolean;
    cardWidth?: string;
    cardWidthUnit?: string;
    cardHeight?: string;
    cardHeightUnit?: string;
    cardPadding?: string;
    cardPaddingUnit?: string;
    cardBorderWidth?: string;
    cardBorderStyle?: string;
    cardBorderColor?: string;
    cardBorderOpacity?: string;
    cardBorderRadius?: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
      unit: string;
    };
    iconBorderWidth?: string;
    iconBorderStyle?: string;
    iconBorderColor?: string;
    iconBorderOpacity?: string;
    iconSize?: string;
    iconBorderRadius?: string;
    iconBorderRadiusUnit?: string;
    cardOpacity?: number;
    zIndex?: string;
    positionType?: string;
    shadowSettings?: {
      inset: boolean;
      x: string;
      y: string;
      blur: string;
      spread: string;
    };
    shadow2Settings?: {
      inset: boolean;
      x: string;
      y: string;
      blur: string;
      spread: string;
      color?: string;
      opacity?: string;
    };
  };
}

export const ExtensionCard: React.FC<ExtensionCardProps> = ({ 
  type, 
  title, 
  description, 
  delay, 
  icon, 
  children,
  customContent,
  cardStyles = {} // Default to empty object
}) => {
  // Default styles
  const defaultBgClasses = {
    obsidian: 'bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(82,48,145,0.70),rgba(26,11,51,0.14))] group-hover:bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(92,58,165,0.85),rgba(36,21,61,0.24))]',
    figma: 'bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(25,41,53,0.7),rgba(18,25,34,0.07))] group-hover:bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(35,51,73,0.85),rgba(28,35,44,0.17))]',
    redis: 'bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(145,48,48,0.70),rgba(51,11,11,0.14))] group-hover:bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(165,58,58,0.85),rgba(61,21,21,0.24))]',
    terminal: 'bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(64,64,64,0.7),rgba(24,24,24,0.07))] group-hover:bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(84,84,84,0.85),rgba(44,44,44,0.17))]',
    docker: 'bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(48,120,145,0.70),rgba(11,30,51,0.14))] group-hover:bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(58,140,165,0.85),rgba(21,40,61,0.24))]'
  };

  const defaultShadowClasses = {
    obsidian: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(51,3,129,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset] group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(124,58,237,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(124,58,237,0.3)]',
    figma: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(3,123,129,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset] group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(26,188,254,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(26,188,254,0.2)]',
    redis: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(129,3,3,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset] group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(237,58,58,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(237,58,58,0.3)]',
    terminal: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(128,128,128,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset] group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(160,160,160,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(160,160,160,0.2)]',
    docker: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(3,102,129,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset] group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(58,188,237,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(58,188,237,0.3)]'
  };

  const defaultIconBgClasses = {
    obsidian: 'bg-gradient-to-br from-[#7c3aed] to-[#a855f7] shadow-[0_4px_12px_rgba(124,58,237,0.3)] group-hover:bg-gradient-to-br group-hover:from-[#8b5cf6] group-hover:to-[#c084fc] group-hover:shadow-[0_8px_24px_rgba(124,58,237,0.5)]',
    figma: 'bg-gradient-to-br from-[#1e293b] to-[#334155] shadow-[0_4px_12px_rgba(30,41,59,0.3)] group-hover:bg-gradient-to-br group-hover:from-[#334155] group-hover:to-[#475569] group-hover:shadow-[0_8px_24px_rgba(30,41,59,0.5)]',
    redis: 'bg-gradient-to-br from-[#dc2626] to-[#ef4444] shadow-[0_4px_12px_rgba(220,38,38,0.3)] group-hover:bg-gradient-to-br group-hover:from-[#ef4444] group-hover:to-[#f87171] group-hover:shadow-[0_8px_24px_rgba(220,38,38,0.5)]',
    terminal: 'bg-gradient-to-br from-[#374151] to-[#6b7280] shadow-[0_4px_12px_rgba(55,65,81,0.3)] group-hover:bg-gradient-to-br group-hover:from-[#6b7280] group-hover:to-[#9ca3af] group-hover:shadow-[0_8px_24px_rgba(55,65,81,0.5)]',
    docker: 'bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] shadow-[0_4px_12px_rgba(14,165,233,0.3)] group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#60a5fa] group-hover:shadow-[0_8px_24px_rgba(14,165,233,0.5)]'
  };

  const defaultCardImageClasses = {
    obsidian: 'bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#A855F7] group-hover:bg-gradient-to-br group-hover:from-[#5B21B6] group-hover:via-[#8B5CF6] group-hover:to-[#C084FC]',
    figma: 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] group-hover:bg-gradient-to-br group-hover:from-[#1e293b] group-hover:via-[#334155] group-hover:to-[#475569]',
    redis: 'bg-gradient-to-br from-[#7f1d1d] via-[#dc2626] to-[#ef4444] group-hover:bg-gradient-to-br group-hover:from-[#991b1b] group-hover:via-[#ef4444] group-hover:to-[#f87171]',
    terminal: 'bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#6b7280] group-hover:bg-gradient-to-br group-hover:from-[#374151] group-hover:via-[#6b7280] group-hover:to-[#9ca3af]',
    docker: 'bg-gradient-to-br from-[#0c4a6e] via-[#0ea5e9] to-[#3b82f6] group-hover:bg-gradient-to-br group-hover:from-[#0369a1] group-hover:via-[#3b82f6] group-hover:to-[#60a5fa]'
  };

  // Generate custom styles if provided
  const getCustomStyles = () => {
    if (!cardStyles || Object.keys(cardStyles).length === 0) {
      return {};
    }

    // Calculate border radius values
    const borderRadiusValue = cardStyles.cardBorderRadius 
      ? `${cardStyles.cardBorderRadius.topLeft}${cardStyles.cardBorderRadius.unit} ${cardStyles.cardBorderRadius.topRight}${cardStyles.cardBorderRadius.unit} ${cardStyles.cardBorderRadius.bottomRight}${cardStyles.cardBorderRadius.unit} ${cardStyles.cardBorderRadius.bottomLeft}${cardStyles.cardBorderRadius.unit}`
      : undefined;
    
    // Calculate shadow values
    let boxShadow;
    if (cardStyles.shadowSettings) {
      const mainShadow = `${cardStyles.shadowSettings.inset ? 'inset ' : ''}${cardStyles.shadowSettings.x}px ${cardStyles.shadowSettings.y}px ${cardStyles.shadowSettings.blur}px ${cardStyles.shadowSettings.spread}px rgba(${hexToRgb(cardStyles.shadowColor || '#000000')}, ${cardStyles.shadowOpacity || '0.3'})`;
      const secondShadow = cardStyles.shadow2Settings 
        ? `, ${cardStyles.shadow2Settings.inset ? 'inset ' : ''}${cardStyles.shadow2Settings.x}px ${cardStyles.shadow2Settings.y}px ${cardStyles.shadow2Settings.blur}px ${cardStyles.shadow2Settings.spread}px rgba(${hexToRgb(cardStyles.shadow2Settings.color || '#ffffff')}, ${cardStyles.shadow2Settings.opacity || '0.1'})`
        : '';
      boxShadow = `${mainShadow}${secondShadow}`;
    }
    
    // Calculate border
    const border = cardStyles.cardBorderWidth && cardStyles.cardBorderWidth !== "0" 
      ? `${cardStyles.cardBorderWidth}px ${cardStyles.cardBorderStyle || 'solid'} rgba(${hexToRgb(cardStyles.cardBorderColor || '#ffffff')}, ${cardStyles.cardBorderOpacity || '0.1'})`
      : undefined;
    
    return {
      width: cardStyles.cardWidth ? `${cardStyles.cardWidth}${cardStyles.cardWidthUnit || 'px'}` : undefined,
      height: cardStyles.cardHeight && cardStyles.cardHeight !== "auto" ? `${cardStyles.cardHeight}${cardStyles.cardHeightUnit || 'px'}` : undefined,
      padding: cardStyles.cardPadding ? `${cardStyles.cardPadding}${cardStyles.cardPaddingUnit || 'px'}` : undefined,
      position: cardStyles.positionType as any,
      zIndex: cardStyles.zIndex,
      opacity: cardStyles.cardOpacity ? cardStyles.cardOpacity / 100 : undefined,
      borderRadius: borderRadiusValue,
      border,
      background: cardStyles.bgGradientFrom && cardStyles.bgGradientTo 
        ? `radial-gradient(86.88% 75.47% at 50.00% 24.53%, rgba(${hexToRgb(cardStyles.bgGradientFrom)}, ${cardStyles.bgOpacityFrom || '0.7'}), rgba(${hexToRgb(cardStyles.bgGradientTo)}, ${cardStyles.bgOpacityTo || '0.14'}))`
        : undefined,
      boxShadow,
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  // Generate custom icon styles if provided
  const getCustomIconStyles = () => {
    if (!cardStyles || Object.keys(cardStyles).length === 0) {
      return {};
    }

    // Calculate icon border
    const border = cardStyles.iconBorderWidth && cardStyles.iconBorderWidth !== "0"
      ? `${cardStyles.iconBorderWidth}px ${cardStyles.iconBorderStyle || 'solid'} rgba(${hexToRgb(cardStyles.iconBorderColor || '#ffffff')}, ${cardStyles.iconBorderOpacity || '0.2'})`
      : undefined;
    
    return {
      width: cardStyles.iconSize ? `${cardStyles.iconSize}px` : undefined,
      height: cardStyles.iconSize ? `${cardStyles.iconSize}px` : undefined,
      borderRadius: cardStyles.iconBorderRadius ? `${cardStyles.iconBorderRadius}${cardStyles.iconBorderRadiusUnit || 'px'}` : undefined,
      border,
      background: cardStyles.iconGradientFrom && cardStyles.iconGradientTo 
        ? `linear-gradient(to bottom right, ${cardStyles.iconGradientFrom}, ${cardStyles.iconGradientTo})`
        : undefined,
      boxShadow: cardStyles.iconGradientFrom 
        ? `0 4px 12px rgba(${hexToRgb(cardStyles.iconGradientFrom)}, 0.3)`
        : undefined,
      transition: 'all 0.3s ease-in-out'
    };
  };

  // Generate custom card image styles if provided
  const getCustomCardImageStyles = () => {
    if (!cardStyles || !cardStyles.cardImageGradientFrom || !cardStyles.cardImageGradientTo) {
      return {};
    }

    return {
      background: `linear-gradient(to bottom right, ${cardStyles.cardImageGradientFrom}, ${cardStyles.cardImageGradientVia || cardStyles.cardImageGradientFrom}, ${cardStyles.cardImageGradientTo})`,
      transition: 'all 0.3s ease-in-out'
    };
  };

  // Helper function to convert hex to rgb
  function hexToRgb(hex: string) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  // Determine if we should use custom styles or default classes
  const useCustomStyles = cardStyles && Object.keys(cardStyles).length > 0;
  const customCardStyles = useCustomStyles ? getCustomStyles() : {};
  const customIconStyles = useCustomStyles ? getCustomIconStyles() : {};
  const customCardImageStyles = useCustomStyles ? getCustomCardImageStyles() : {};

  return (
    <div className={`opacity-0 transform-origin-top-right animate-slide-in`} style={{ animationDelay: delay }}>
      <div 
        className={`w-80 rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-300 ease-cubic-bezier-custom group hover:translate-y-[-8px] hover:scale-102 active:translate-y-[-4px] active:scale-98 active:transition-all active:duration-100 active:ease-in-out ${!useCustomStyles ? `${defaultBgClasses[type]} ${defaultShadowClasses[type]}` : ''}`}
        style={customCardStyles}
      >
        <div className="px-5 pt-5">
          <div className="flex items-start gap-3 mb-3">
            <div 
              className={`flex items-center justify-center flex-shrink-0 relative transition-all duration-300 ease-in-out group-hover:scale-105 group-active:scale-95 ${!useCustomStyles ? `w-14 h-14 rounded-xl ${defaultIconBgClasses[type]}` : ''}`}
              style={customIconStyles}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-semibold text-white mb-1 leading-tight transition-all duration-300 ease-in-out">
                {title}
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg bg-white/8 border-none flex items-center justify-center cursor-pointer transition-all duration-300 ease-cubic-bezier-custom flex-shrink-0 relative overflow-hidden hover:bg-white/15 hover:translate-x-1 hover:scale-110 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] active:translate-x-0.5 active:scale-95 active:bg-white/20">
              <Icon icon="lucide:arrow-right" className="w-4 h-4 text-white/80 transition-all duration-300 ease-in-out group-hover:text-white group-hover:translate-x-0.5" />
            </button>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4 transition-color duration-300 ease-in-out group-hover:text-white/85">
            {description}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent group-hover:shadow-[0_0_8px_rgba(255,255,255,0.1)]"></div>
        </div>
        <div 
          className={`w-full h-[180px] relative overflow-hidden flex items-center justify-center transition-all duration-300 ease-in-out ${!useCustomStyles ? defaultCardImageClasses[type] : ''}`}
          style={customCardImageStyles}
        >
          {customContent ? (
            <img 
              src={customContent} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};