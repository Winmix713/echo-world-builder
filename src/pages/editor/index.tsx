import React from 'react';
import { Card, CardBody, Input, Tabs, Tab, Button, Checkbox, Select, SelectItem } from "@heroui/react";
import { Icon } from '@iconify/react';
import { CardPreview } from './card-preview';
import { Slider, Popover, PopoverTrigger, PopoverContent, Tooltip, Divider, Switch } from "@heroui/react";
import { ColorPicker } from './color-picker';
import { BorderControls } from './border-controls';
import { UndoRedoProvider, useUndoRedo } from './undo-redo-context';
import { Badge, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { CardManager } from '../../context/card-manager-context';
import { Image } from "@heroui/react";

// Add new imports for refactored components
import { EditorHeader } from './components/editor-header';
import { EditorPreview } from './components/editor-preview';
import { BasicSettingsTab } from './components/tabs/basic-settings-tab';
import { BorderSettingsTab } from './components/tabs/border-settings-tab';
import { BackgroundTab } from './components/tabs/background-tab';
import { ShadowsTab } from './components/tabs/shadows-tab';
import { CssTab } from './components/tabs/css-tab';
import { SaveModal, ResetModal, NewCardModal } from './components/modals';

const cardTypes = [
  { key: "obsidian", label: "Obsidian" },
  { key: "figma", label: "Figma" },
  { key: "redis", label: "Redis" },
  { key: "terminal", label: "Terminal" },
  { key: "docker", label: "Docker" }
];

function EditorPageContent() {
  // Get undo/redo functionality
  const { addToHistory, undo, redo, canUndo, canRedo } = useUndoRedo();
  
  // Get card management functionality
  const { 
    cards, 
    activeCardId, 
    setActiveCardId, 
    updateCard, 
    resetCardToDefault, 
    createNewCard,
    deleteCard,
    toggleCardActive
  } = React.useContext(CardManager);
  
  // Modal states
  const { isOpen: isSaveModalOpen, onOpen: onOpenSaveModal, onClose: onCloseSaveModal } = useDisclosure();
  const { isOpen: isResetModalOpen, onOpen: onOpenResetModal, onClose: onCloseResetModal } = useDisclosure();
  const { isOpen: isNewCardModalOpen, onOpen: onOpenNewCardModal, onClose: onCloseNewCardModal } = useDisclosure();
  
  // New card form state
  const [newCardType, setNewCardType] = React.useState<string>("obsidian");
  const [newCardTitle, setNewCardTitle] = React.useState<string>("");
  const [newCardDescription, setNewCardDescription] = React.useState<string>("");
  
  // Create a state object to hold all card properties
  const [cardState, setCardState] = React.useState({
    // Basic settings
    selectedType: "obsidian",
    title: "Obsidian",
    description: "Capture information, manage tasks and pin notes to your menu bar.",
    delay: "500ms",
    
    // Image settings
    iconImage: null as string | null,
    contentImage: null as string | null,
    useCustomIcon: false,
    useCustomContent: false,
    
    // Background gradient settings
    bgGradientFrom: "#523091",
    bgGradientTo: "#1a0b33",
    bgOpacityFrom: "0.70",
    bgOpacityTo: "0.14",
    
    // Icon gradient settings
    iconGradientFrom: "#7c3aed",
    iconGradientTo: "#a855f7",
    
    // Card image gradient settings
    cardImageGradientFrom: "#4C1D95",
    cardImageGradientVia: "#7C3AED",
    cardImageGradientTo: "#A855F7",
    
    // Shadow settings
    shadowColor: "#7c3aed",
    shadowOpacity: "0.3",
    
    // Animation settings
    enableHoverEffects: true,
    enableAnimations: true,
    
    // Card dimensions
    cardWidth: "320",
    cardWidthUnit: "px",
    cardHeight: "auto",
    cardHeightUnit: "px",
    
    // Card padding
    cardPadding: "20",
    cardPaddingUnit: "px",
    
    // Card border
    cardBorderWidth: "0",
    cardBorderStyle: "solid",
    cardBorderColor: "#ffffff",
    cardBorderOpacity: "0.1",
    
    // Card border radius
    cardBorderRadiusTopLeft: "16",
    cardBorderRadiusTopRight: "16",
    cardBorderRadiusBottomLeft: "16",
    cardBorderRadiusBottomRight: "16",
    cardBorderRadiusUnit: "px",
    linkBorderRadius: true,
    
    // Icon border
    iconBorderWidth: "0",
    iconBorderStyle: "solid",
    iconBorderColor: "#ffffff",
    iconBorderOpacity: "0.2",
    
    // Icon dimensions
    iconSize: "56",
    iconBorderRadius: "12",
    iconBorderRadiusUnit: "px",
    
    // Opacity and z-index
    cardOpacity: 100,
    zIndex: "1",
    
    // Position
    positionType: "relative",
    
    // Advanced shadow settings
    shadowInset: false,
    shadowX: "0",
    shadowY: "30",
    shadowBlur: "50",
    shadowSpread: "0",
    
    // Additional shadow
    useSecondShadow: true,
    shadow2Inset: true,
    shadow2X: "0",
    shadow2Y: "1",
    shadow2Blur: "0",
    shadow2Spread: "0",
    shadow2Color: "#ffffff",
    shadow2Opacity: "0.1",
    
    // CSS output settings
    minifyCss: false,
    includePrefixes: true
  });

  // Create a function to update card state properties
  const updateCardState = (updates: Partial<typeof cardState>) => {
    setCardState(prev => ({ ...prev, ...updates }));
  };

  // Get the current active card
  const activeCard = React.useMemo(() => {
    return cards.find(card => card.id === activeCardId);
  }, [cards, activeCardId]);

  // Initialize editor state from active card
  React.useEffect(() => {
    if (activeCard) {
      // Create an updates object to collect all changes
      const updates: Partial<typeof cardState> = {
        selectedType: activeCard.type,
        title: activeCard.title,
        description: activeCard.description,
        delay: activeCard.delay || "500ms",
        bgGradientFrom: activeCard.bgGradientFrom,
        bgGradientTo: activeCard.bgGradientTo,
        bgOpacityFrom: activeCard.bgOpacityFrom,
        bgOpacityTo: activeCard.bgOpacityTo,
        iconGradientFrom: activeCard.iconGradientFrom,
        iconGradientTo: activeCard.iconGradientTo,
        cardImageGradientFrom: activeCard.cardImageGradientFrom,
        cardImageGradientVia: activeCard.cardImageGradientVia,
        cardImageGradientTo: activeCard.cardImageGradientTo,
        shadowColor: activeCard.shadowColor,
        shadowOpacity: activeCard.shadowOpacity,
        enableHoverEffects: activeCard.enableHoverEffects,
        enableAnimations: activeCard.enableAnimations,
      };
      
      // Add additional properties if they exist
      if (activeCard.cardWidth) updates.cardWidth = activeCard.cardWidth;
      if (activeCard.cardWidthUnit) updates.cardWidthUnit = activeCard.cardWidthUnit;
      if (activeCard.cardHeight) updates.cardHeight = activeCard.cardHeight;
      if (activeCard.cardHeightUnit) updates.cardHeightUnit = activeCard.cardHeightUnit;
      if (activeCard.cardPadding) updates.cardPadding = activeCard.cardPadding;
      if (activeCard.cardPaddingUnit) updates.cardPaddingUnit = activeCard.cardPaddingUnit;
      if (activeCard.cardBorderWidth) updates.cardBorderWidth = activeCard.cardBorderWidth;
      if (activeCard.cardBorderStyle) updates.cardBorderStyle = activeCard.cardBorderStyle;
      if (activeCard.cardBorderColor) updates.cardBorderColor = activeCard.cardBorderColor;
      if (activeCard.cardBorderOpacity) updates.cardBorderOpacity = activeCard.cardBorderOpacity;
      
      if (activeCard.cardBorderRadius) {
        updates.cardBorderRadiusTopLeft = activeCard.cardBorderRadius.topLeft;
        updates.cardBorderRadiusTopRight = activeCard.cardBorderRadius.topRight;
        updates.cardBorderRadiusBottomLeft = activeCard.cardBorderRadius.bottomLeft;
        updates.cardBorderRadiusBottomRight = activeCard.cardBorderRadius.bottomRight;
        updates.cardBorderRadiusUnit = activeCard.cardBorderRadius.unit;
      }
      
      if (activeCard.iconBorderWidth) updates.iconBorderWidth = activeCard.iconBorderWidth;
      if (activeCard.iconBorderStyle) updates.iconBorderStyle = activeCard.iconBorderStyle;
      if (activeCard.iconBorderColor) updates.iconBorderColor = activeCard.iconBorderColor;
      if (activeCard.iconBorderOpacity) updates.iconBorderOpacity = activeCard.iconBorderOpacity;
      if (activeCard.iconSize) updates.iconSize = activeCard.iconSize;
      if (activeCard.iconBorderRadius) updates.iconBorderRadius = activeCard.iconBorderRadius;
      if (activeCard.iconBorderRadiusUnit) updates.iconBorderRadiusUnit = activeCard.iconBorderRadiusUnit;
      if (activeCard.cardOpacity) updates.cardOpacity = activeCard.cardOpacity;
      if (activeCard.zIndex) updates.zIndex = activeCard.zIndex;
      if (activeCard.positionType) updates.positionType = activeCard.positionType;
      
      if (activeCard.shadowSettings) {
        updates.shadowInset = activeCard.shadowSettings.inset;
        updates.shadowX = activeCard.shadowSettings.x;
        updates.shadowY = activeCard.shadowSettings.y;
        updates.shadowBlur = activeCard.shadowSettings.blur;
        updates.shadowSpread = activeCard.shadowSettings.spread;
      }
      
      if (activeCard.shadow2Settings) {
        updates.useSecondShadow = true;
        updates.shadow2Inset = activeCard.shadow2Settings.inset;
        updates.shadow2X = activeCard.shadow2Settings.x;
        updates.shadow2Y = activeCard.shadow2Settings.y;
        updates.shadow2Blur = activeCard.shadow2Settings.blur;
        updates.shadow2Spread = activeCard.shadow2Settings.spread;
        updates.shadow2Color = activeCard.shadow2Settings.color || "#ffffff";
        updates.shadow2Opacity = activeCard.shadow2Settings.opacity || "0.1";
      } else {
        updates.useSecondShadow = false;
      }
      
      // Custom images
      if (activeCard.iconImage) {
        updates.iconImage = activeCard.iconImage;
        updates.useCustomIcon = true;
      } else {
        updates.iconImage = null;
        updates.useCustomIcon = false;
      }
      
      if (activeCard.contentImage) {
        updates.contentImage = activeCard.contentImage;
        updates.useCustomContent = true;
      } else {
        updates.contentImage = null;
        updates.useCustomContent = false;
      }
      
      // Update the state with all changes at once
      setCardState(prev => ({ ...prev, ...updates }));
    }
  }, [activeCard]);

  // Save changes to the card
  const handleSave = () => {
    if (!activeCardId) return;
    
    const updatedCard = {
      id: activeCardId,
      type: cardState.selectedType,
      title: cardState.title,
      description: cardState.description,
      delay: cardState.delay,
      bgGradientFrom: cardState.bgGradientFrom,
      bgGradientTo: cardState.bgGradientTo,
      bgOpacityFrom: cardState.bgOpacityFrom,
      bgOpacityTo: cardState.bgOpacityTo,
      iconGradientFrom: cardState.iconGradientFrom,
      iconGradientTo: cardState.iconGradientTo,
      cardImageGradientFrom: cardState.cardImageGradientFrom,
      cardImageGradientVia: cardState.cardImageGradientVia,
      cardImageGradientTo: cardState.cardImageGradientTo,
      shadowColor: cardState.shadowColor,
      shadowOpacity: cardState.shadowOpacity,
      enableHoverEffects: cardState.enableHoverEffects,
      enableAnimations: cardState.enableAnimations,
      cardWidth: cardState.cardWidth,
      cardWidthUnit: cardState.cardWidthUnit,
      cardHeight: cardState.cardHeight,
      cardHeightUnit: cardState.cardHeightUnit,
      cardPadding: cardState.cardPadding,
      cardPaddingUnit: cardState.cardPaddingUnit,
      cardBorderWidth: cardState.cardBorderWidth,
      cardBorderStyle: cardState.cardBorderStyle,
      cardBorderColor: cardState.cardBorderColor,
      cardBorderOpacity: cardState.cardBorderOpacity,
      cardBorderRadius: {
        topLeft: cardState.cardBorderRadiusTopLeft,
        topRight: cardState.cardBorderRadiusTopRight,
        bottomLeft: cardState.cardBorderRadiusBottomLeft,
        bottomRight: cardState.cardBorderRadiusBottomRight,
        unit: cardState.cardBorderRadiusUnit
      },
      iconBorderWidth: cardState.iconBorderWidth,
      iconBorderStyle: cardState.iconBorderStyle,
      iconBorderColor: cardState.iconBorderColor,
      iconBorderOpacity: cardState.iconBorderOpacity,
      iconSize: cardState.iconSize,
      iconBorderRadius: cardState.iconBorderRadius,
      iconBorderRadiusUnit: cardState.iconBorderRadiusUnit,
      cardOpacity: cardState.cardOpacity,
      zIndex: cardState.zIndex,
      positionType: cardState.positionType,
      shadowSettings: {
        inset: cardState.shadowInset,
        x: cardState.shadowX,
        y: cardState.shadowY,
        blur: cardState.shadowBlur,
        spread: cardState.shadowSpread
      },
      shadow2Settings: cardState.useSecondShadow ? {
        inset: cardState.shadow2Inset,
        x: cardState.shadow2X,
        y: cardState.shadow2Y,
        blur: cardState.shadow2Blur,
        spread: cardState.shadow2Spread,
        color: cardState.shadow2Color,
        opacity: cardState.shadow2Opacity
      } : undefined,
      iconImage: cardState.useCustomIcon ? cardState.iconImage : null,
      contentImage: cardState.useCustomContent ? cardState.contentImage : null
    };
    
    updateCard(updatedCard);
    onCloseSaveModal();
  };

  // Reset card to default
  const handleReset = () => {
    if (!activeCardId) return;
    resetCardToDefault(activeCardId);
    onCloseResetModal();
  };

  // Create a new card
  const handleCreateNewCard = () => {
    if (!newCardTitle || !newCardType) return;
    
    createNewCard({
      type: newCardType as any,
      title: newCardTitle,
      description: newCardDescription,
      delay: "500ms"
    });
    
    // Reset form
    setNewCardTitle("");
    setNewCardDescription("");
    setNewCardType("obsidian");
    onCloseNewCardModal();
  };

  // Handle image upload for icon
  const handleIconImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateCardState({
            iconImage: event.target.result as string,
            useCustomIcon: true
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload for content
  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateCardState({
            contentImage: event.target.result as string,
            useCustomContent: true
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply preset styles
  const applyPreset = (presetId: string) => {
    // Save current state to history before applying preset
    addToHistory({
      cardBorderWidth: cardState.cardBorderWidth,
      cardBorderStyle: cardState.cardBorderStyle,
      cardBorderColor: cardState.cardBorderColor,
      cardBorderOpacity: cardState.cardBorderOpacity,
      shadowX: cardState.shadowX,
      shadowY: cardState.shadowY,
      shadowBlur: cardState.shadowBlur,
      shadowSpread: cardState.shadowSpread,
      shadowInset: cardState.shadowInset,
      bgGradientFrom: cardState.bgGradientFrom,
      bgGradientTo: cardState.bgGradientTo,
      bgOpacityFrom: cardState.bgOpacityFrom,
      bgOpacityTo: cardState.bgOpacityTo,
    });

    // Create an updates object for the preset changes
    const updates: Partial<typeof cardState> = {};

    switch (presetId) {
      case "flat":
        updates.shadowX = "0";
        updates.shadowY = "0";
        updates.shadowBlur = "0";
        updates.shadowSpread = "0";
        updates.useSecondShadow = false;
        updates.cardBorderWidth = "1";
        updates.cardBorderColor = "#000000";
        updates.cardBorderOpacity = "0.1";
        break;
      case "glass":
        updates.bgOpacityFrom = "0.2";
        updates.bgOpacityTo = "0.1";
        updates.cardBorderWidth = "1";
        updates.cardBorderColor = "#ffffff";
        updates.cardBorderOpacity = "0.2";
        updates.shadowX = "0";
        updates.shadowY = "10";
        updates.shadowBlur = "30";
        updates.shadowSpread = "0";
        updates.shadowOpacity = "0.15";
        break;
      case "neumorphism":
        updates.bgGradientFrom = "#e0e0e0";
        updates.bgGradientTo = "#e0e0e0";
        updates.bgOpacityFrom = "1";
        updates.bgOpacityTo = "1";
        updates.shadowColor = "#ffffff";
        updates.shadowOpacity = "1";
        updates.shadowX = "-10";
        updates.shadowY = "-10";
        updates.shadowBlur = "20";
        updates.shadowSpread = "0";
        updates.useSecondShadow = true;
        updates.shadow2Color = "#000000";
        updates.shadow2Opacity = "0.1";
        updates.shadow2X = "10";
        updates.shadow2Y = "10";
        updates.shadow2Blur = "20";
        updates.shadow2Spread = "0";
        updates.cardBorderWidth = "0";
        break;
      case "material":
        updates.shadowX = "0";
        updates.shadowY = "4";
        updates.shadowBlur = "20";
        updates.shadowSpread = "0";
        updates.shadowOpacity = "0.2";
        updates.useSecondShadow = true;
        updates.shadow2X = "0";
        updates.shadow2Y = "2";
        updates.shadow2Blur = "4";
        updates.shadow2Spread = "0";
        updates.shadow2Color = "#000000";
        updates.shadow2Opacity = "0.1";
        updates.cardBorderWidth = "0";
        break;
      default: // default preset
        // Reset to default values
        updates.shadowX = "0";
        updates.shadowY = "30";
        updates.shadowBlur = "50";
        updates.shadowSpread = "0";
        updates.shadowOpacity = "0.4";
        updates.useSecondShadow = true;
        updates.shadow2Inset = true;
        updates.shadow2X = "0";
        updates.shadow2Y = "1";
        updates.shadow2Blur = "0";
        updates.shadow2Spread = "0";
        updates.shadow2Color = "#ffffff";
        updates.shadow2Opacity = "0.1";
        updates.cardBorderWidth = "0";
        break;
    }

    // Apply all updates at once
    updateCardState(updates);
  };

  // Generate CSS code
  const generateCssCode = () => {
    // Calculate border radius values
    const borderRadiusValue = cardState.linkBorderRadius 
      ? `${cardState.cardBorderRadiusTopLeft}${cardState.cardBorderRadiusUnit}`
      : `${cardState.cardBorderRadiusTopLeft}${cardState.cardBorderRadiusUnit} ${cardState.cardBorderRadiusTopRight}${cardState.cardBorderRadiusUnit} ${cardState.cardBorderRadiusBottomRight}${cardState.cardBorderRadiusUnit} ${cardState.cardBorderRadiusBottomLeft}${cardState.cardBorderRadiusUnit}`;
    
    // Calculate shadow values
    const mainShadow = `${cardState.shadowInset ? 'inset ' : ''}${cardState.shadowX}px ${cardState.shadowY}px ${cardState.shadowBlur}px ${cardState.shadowSpread}px rgba(${hexToRgb(cardState.shadowColor)}, ${cardState.shadowOpacity})`;
    const secondShadow = cardState.useSecondShadow 
      ? `, ${cardState.shadow2Inset ? 'inset ' : ''}${cardState.shadow2X}px ${cardState.shadow2Y}px ${cardState.shadow2Blur}px ${cardState.shadow2Spread}px rgba(${hexToRgb(cardState.shadow2Color)}, ${cardState.shadow2Opacity})`
      : '';
    
    // Calculate border
    const borderValue = cardState.cardBorderWidth !== "0" 
      ? `${cardState.cardBorderWidth}px ${cardState.cardBorderStyle} rgba(${hexToRgb(cardState.cardBorderColor)}, ${cardState.cardBorderOpacity})`
      : 'none';
    
    // Calculate icon border
    const iconBorderValue = cardState.iconBorderWidth !== "0"
      ? `${cardState.iconBorderWidth}px ${cardState.iconBorderStyle} rgba(${hexToRgb(cardState.iconBorderColor)}, ${cardState.iconBorderOpacity})`
      : 'none';

    // Generate the CSS
    let css = `/* ${cardState.selectedType.toUpperCase()} CARD STYLES */

/* Card Container */
.${cardState.selectedType}-card {
  width: ${cardState.cardWidth}${cardState.cardWidthUnit};
  height: ${cardState.cardHeight === "auto" ? "auto" : `${cardState.cardHeight}${cardState.cardHeightUnit}`};
  position: ${cardState.positionType};
  z-index: ${cardState.zIndex};
  opacity: ${cardState.cardOpacity / 100};
  padding: ${cardState.cardPadding}${cardState.cardPaddingUnit};
  border-radius: ${borderRadiusValue};
  border: ${borderValue};
  background: radial-gradient(86.88% 75.47% at 50.00% 24.53%, 
    rgba(${hexToRgb(cardState.bgGradientFrom)}, ${cardState.bgOpacityFrom}), 
    rgba(${hexToRgb(cardState.bgGradientTo)}, ${cardState.bgOpacityTo}));
  box-shadow: ${mainShadow}${secondShadow};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Icon Container */
.${cardState.selectedType}-icon {
  width: ${cardState.iconSize}px;
  height: ${cardState.iconSize}px;
  border-radius: ${cardState.iconBorderRadius}${cardState.iconBorderRadiusUnit};
  border: ${iconBorderValue};
  background: linear-gradient(to bottom right, ${cardState.iconGradientFrom}, ${cardState.iconGradientTo});
  box-shadow: 0 4px 12px rgba(${hexToRgb(cardState.iconGradientFrom)}, 0.3);
  transition: all 0.3s ease-in-out;
}

/* Card Image Background */
.${cardState.selectedType}-card-image {
  background: linear-gradient(to bottom right, 
    ${cardState.cardImageGradientFrom}, 
    ${cardState.cardImageGradientVia}, 
    ${cardState.cardImageGradientTo});
}

/* Hover Effects */
${cardState.enableHoverEffects ? `
.${cardState.selectedType}-card:hover {
  transform: translateY(-8px) scale(1.02);
  background: radial-gradient(86.88% 75.47% at 50.00% 24.53%, 
    rgba(${hexToRgb(cardState.bgGradientFrom)}, ${parseFloat(cardState.bgOpacityFrom) + 0.15}), 
    rgba(${hexToRgb(cardState.bgGradientTo)}, ${parseFloat(cardState.bgOpacityTo) + 0.1}));
  box-shadow: ${cardState.shadowInset ? 'inset ' : ''}${cardState.shadowX}px ${parseInt(cardState.shadowY) + 20}px ${parseInt(cardState.shadowBlur) + 30}px ${cardState.shadowSpread}px rgba(${hexToRgb(cardState.shadowColor)}, ${parseFloat(cardState.shadowOpacity) + 0.2})${secondShadow};
}

.${cardState.selectedType}-icon:hover {
  transform: scale(1.05);
  background: linear-gradient(to bottom right, 
    ${lightenColor(cardState.iconGradientFrom, 10)}, 
    ${lightenColor(cardState.iconGradientTo, 10)});
  box-shadow: 0 8px 24px rgba(${hexToRgb(cardState.iconGradientFrom)}, 0.5);
}

.${cardState.selectedType}-card-image:hover {
  background: linear-gradient(to bottom right, 
    ${lightenColor(cardState.cardImageGradientFrom, 10)}, 
    ${lightenColor(cardState.cardImageGradientVia, 10)}, 
    ${lightenColor(cardState.cardImageGradientTo, 10)});
}
` : ''}

/* Animations */
${cardState.enableAnimations ? `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.${cardState.selectedType}-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}

.${cardState.selectedType}-pulse {
  animation: pulse 2s ease-in-out infinite;
}
` : ''}`;

    // Add browser prefixes if needed
    if (cardState.includePrefixes) {
      css = css.replace(/border-radius: /g, "-webkit-border-radius: $&\nborder-radius: ")
        .replace(/box-shadow: /g, "-webkit-box-shadow: $&\n-moz-box-shadow: $&\nbox-shadow: ")
        .replace(/background: (linear|radial)-gradient/g, "background: -webkit-$1-gradient$&\nbackground: -moz-$1-gradient$&\nbackground: $1-gradient");
    }
    
    // Minify if requested
    if (cardState.minifyCss) {
      css = css.replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*;\s*/g, ';')
        .replace(/\/\*.*?\*\//g, '')
        .trim();
    }
    
    return css;
  };

  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string) => {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };

  // Helper function to lighten a color
  const lightenColor = (color: string, percent: number) => {
    // Remove the # if present
    color = color.replace('#', '');
    
    // Parse the hex values
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    // Lighten each component
    r = Math.min(255, Math.floor(r * (1 + percent / 100)));
    g = Math.min(255, Math.floor(g * (1 + percent / 100)));
    b = Math.min(255, Math.floor(b * (1 + percent / 100)));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Handle border radius linking
  const handleBorderRadiusChange = (value: string, corner: string) => {
    if (cardState.linkBorderRadius) {
      updateCardState({
        cardBorderRadiusTopLeft: value,
        cardBorderRadiusTopRight: value,
        cardBorderRadiusBottomLeft: value,
        cardBorderRadiusBottomRight: value
      });
    } else {
      switch (corner) {
        case "topLeft":
          updateCardState({ cardBorderRadiusTopLeft: value });
          break;
        case "topRight":
          updateCardState({ cardBorderRadiusTopRight: value });
          break;
        case "bottomLeft":
          updateCardState({ cardBorderRadiusBottomLeft: value });
          break;
        case "bottomRight":
          updateCardState({ cardBorderRadiusBottomRight: value });
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#0d0d21] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with card selection and action buttons */}
        <EditorHeader 
          cards={cards}
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          activeCard={activeCard}
          onNewCard={onOpenNewCardModal}
          onDeleteCard={deleteCard}
          onToggleActive={toggleCardActive}
          onSave={onOpenSaveModal}
          onReset={onOpenResetModal}
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Editor controls */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1e1e2e]/80 backdrop-blur-md border border-white/10">
              <CardBody>
                <Tabs aria-label="Card Editor Options">
                  {/* Basic Settings Tab */}
                  <Tab key="basic" title="Basic Settings">
                    <BasicSettingsTab 
                      cardState={cardState}
                      updateCardState={updateCardState}
                      addToHistory={addToHistory}
                      cardTypes={cardTypes}
                      handleIconImageUpload={handleIconImageUpload}
                      handleContentImageUpload={handleContentImageUpload}
                    />
                  </Tab>
                  
                  {/* Border Settings Tab */}
                  <Tab key="border" title="Border Settings">
                    <BorderSettingsTab 
                      cardState={cardState}
                      updateCardState={updateCardState}
                      handleBorderRadiusChange={handleBorderRadiusChange}
                    />
                  </Tab>
                  
                  {/* Background Tab */}
                  <Tab key="background" title="Background">
                    <BackgroundTab 
                      cardState={cardState}
                      updateCardState={updateCardState}
                      addToHistory={addToHistory}
                    />
                  </Tab>
                  
                  {/* Shadows Tab */}
                  <Tab key="shadows" title="Shadows">
                    <ShadowsTab 
                      cardState={cardState}
                      updateCardState={updateCardState}
                      addToHistory={addToHistory}
                    />
                  </Tab>
                  
                  {/* CSS Tab */}
                  <Tab key="css" title="Generated CSS">
                    <CssTab 
                      cardState={cardState}
                      updateCardState={updateCardState}
                      generateCssCode={generateCssCode}
                    />
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
          
          {/* Right side: Preview */}
          <div>
            <EditorPreview cardState={cardState} />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <SaveModal 
        isOpen={isSaveModalOpen} 
        onClose={onCloseSaveModal} 
        onSave={handleSave} 
      />
      
      <ResetModal 
        isOpen={isResetModalOpen} 
        onClose={onCloseResetModal} 
        onReset={handleReset} 
      />
      
      <NewCardModal 
        isOpen={isNewCardModalOpen} 
        onClose={onCloseNewCardModal} 
        onCreateCard={handleCreateNewCard}
        cardTypes={cardTypes}
        newCardType={newCardType}
        setNewCardType={setNewCardType}
        newCardTitle={newCardTitle}
        setNewCardTitle={setNewCardTitle}
        newCardDescription={newCardDescription}
        setNewCardDescription={setNewCardDescription}
      />
    </div>
  );
}

// Wrap the editor with the UndoRedoProvider
function EditorPage() {
  return (
    <UndoRedoProvider>
      <EditorPageContent />
    </UndoRedoProvider>
  );
}

export default EditorPage;