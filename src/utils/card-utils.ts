
import { Card, CardType, BorderRadius, ShadowSettings } from '../types/card';

/**
 * Creates a default card configuration with preset values
 * @returns {Card} A new card with default settings
 */
export const createDefaultCard = (id: string): Card => {
  return {
    id,
    title: 'New Card',
    description: 'Card description goes here',
    isActive: true,
    selectedType: 'basic',
    delay: '0',
    // Gradient settings
    bgGradientFrom: '#4f46e5',
    bgGradientTo: '#9333ea',
    bgOpacityFrom: '1',
    bgOpacityTo: '1',
    // Icon settings
    iconGradientFrom: '#ffffff',
    iconGradientTo: '#f3f4f6',
    // Image settings
    cardImageGradientFrom: '#4f46e5',
    cardImageGradientVia: '#6366f1',
    cardImageGradientTo: '#9333ea',
    // Shadow settings
    shadowColor: '#000000',
    shadowOpacity: '0.2',
    // Effects
    enableHoverEffects: true,
    enableAnimations: true,
    // Size and positioning
    cardWidth: '300',
    cardWidthUnit: 'px',
    cardHeight: 'auto',
    cardHeightUnit: 'px',
    cardPadding: '24',
    cardPaddingUnit: 'px',
    // Border settings
    cardBorderWidth: '1',
    cardBorderStyle: 'solid',
    cardBorderColor: '#ffffff',
    cardBorderOpacity: '0.1',
    cardBorderRadiusTopLeft: '8',
    cardBorderRadiusTopRight: '8',
    cardBorderRadiusBottomLeft: '8',
    cardBorderRadiusBottomRight: '8',
    cardBorderRadiusUnit: 'px',
    // Icon settings
    iconBorderWidth: '1',
    iconBorderStyle: 'solid',
    iconBorderColor: '#ffffff',
    iconBorderOpacity: '0.1',
    iconSize: '24',
    iconBorderRadius: '50',
    iconBorderRadiusUnit: '%',
    // Additional styling
    cardOpacity: '1',
    zIndex: '1',
    positionType: 'relative',
    // Shadow details
    shadowInset: false,
    shadowX: '0',
    shadowY: '4',
    shadowBlur: '8',
    shadowSpread: '0',
    // Secondary shadow
    useSecondShadow: false,
    shadow2Inset: false,
    shadow2X: '0',
    shadow2Y: '10',
    shadow2Blur: '20',
    shadow2Spread: '0',
    shadow2Color: '#000000',
    shadow2Opacity: '0.1',
    // Custom content
    useCustomIcon: false,
    iconImage: null,
    useCustomContent: false,
    contentImage: null,
  };
};

/**
 * Converts a Card object to CardPreviewProps format
 * @param {Card} card The card to convert
 * @returns {CardPreviewProps} The formatted preview props
 */
export const cardToPreviewProps = (card: Card) => {
  // Extract border radius properties
  const borderRadius: BorderRadius = {
    topLeft: card.cardBorderRadiusTopLeft,
    topRight: card.cardBorderRadiusTopRight,
    bottomLeft: card.cardBorderRadiusBottomLeft,
    bottomRight: card.cardBorderRadiusBottomRight,
    unit: card.cardBorderRadiusUnit
  };

  // Extract shadow settings
  const shadowSettings: ShadowSettings = {
    inset: card.shadowInset,
    x: card.shadowX,
    y: card.shadowY,
    blur: card.shadowBlur,
    spread: card.shadowSpread,
    color: card.shadowColor,
    opacity: card.shadowOpacity
  };

  // Extract second shadow if enabled
  const shadow2Settings = card.useSecondShadow ? {
    inset: card.shadow2Inset,
    x: card.shadow2X,
    y: card.shadow2Y,
    blur: card.shadow2Blur,
    spread: card.shadow2Spread,
    color: card.shadow2Color,
    opacity: card.shadow2Opacity
  } : undefined;

  return {
    type: card.selectedType as CardType,
    title: card.title,
    description: card.description,
    delay: card.delay,
    bgGradientFrom: card.bgGradientFrom,
    bgGradientTo: card.bgGradientTo,
    bgOpacityFrom: card.bgOpacityFrom,
    bgOpacityTo: card.bgOpacityTo,
    iconGradientFrom: card.iconGradientFrom,
    iconGradientTo: card.iconGradientTo,
    cardImageGradientFrom: card.cardImageGradientFrom,
    cardImageGradientVia: card.cardImageGradientVia,
    cardImageGradientTo: card.cardImageGradientTo,
    shadowColor: card.shadowColor,
    shadowOpacity: card.shadowOpacity,
    enableHoverEffects: card.enableHoverEffects,
    enableAnimations: card.enableAnimations,
    // Additional props
    cardWidth: card.cardWidth,
    cardWidthUnit: card.cardWidthUnit,
    cardHeight: card.cardHeight,
    cardHeightUnit: card.cardHeightUnit,
    cardPadding: card.cardPadding,
    cardPaddingUnit: card.cardPaddingUnit,
    cardBorderWidth: card.cardBorderWidth,
    cardBorderStyle: card.cardBorderStyle,
    cardBorderColor: card.cardBorderColor,
    cardBorderOpacity: card.cardBorderOpacity,
    cardBorderRadius: borderRadius,
    iconBorderWidth: card.iconBorderWidth,
    iconBorderStyle: card.iconBorderStyle,
    iconBorderColor: card.iconBorderColor,
    iconBorderOpacity: card.iconBorderOpacity,
    iconSize: card.iconSize,
    iconBorderRadius: card.iconBorderRadius,
    iconBorderRadiusUnit: card.iconBorderRadiusUnit,
    cardOpacity: card.cardOpacity,
    zIndex: card.zIndex,
    positionType: card.positionType,
    shadowSettings,
    shadow2Settings,
    iconImage: card.useCustomIcon ? card.iconImage : null,
    contentImage: card.useCustomContent ? card.contentImage : null,
  };
};

/**
 * Generates a CSS shadow style from shadow settings
 * @param {ShadowSettings} settings Shadow configuration
 * @param {string} color Shadow color
 * @param {string} opacity Shadow opacity
 * @returns {string} CSS box-shadow value
 */
export const generateShadowStyle = (
  settings: ShadowSettings,
  color = '#000000',
  opacity = '0.2'
): string => {
  const insetValue = settings.inset ? 'inset ' : '';
  const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${parseFloat(opacity)})`;
  
  return `${insetValue}${settings.x}px ${settings.y}px ${settings.blur}px ${settings.spread}px ${rgba}`;
};
