
/**
 * Card type identifiers for different card variants
 */
export type CardType = 
  | 'basic'
  | 'gradient'
  | 'icon'
  | 'animated'
  | 'advanced'
  | 'custom';

/**
 * Border radius configuration for card corners 
 */
export interface BorderRadius {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  unit: string;
}

/**
 * Shadow configuration for card elements
 */
export interface ShadowSettings {
  inset: boolean;
  x: string;
  y: string;
  blur: string;
  spread: string;
  color?: string;
  opacity?: string;
}

/**
 * Core card data structure
 */
export interface Card {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  selectedType: CardType;
  delay: string;
  // Gradient settings
  bgGradientFrom: string;
  bgGradientTo: string;
  bgOpacityFrom: string;
  bgOpacityTo: string;
  // Icon settings
  iconGradientFrom: string;
  iconGradientTo: string;
  // Image settings
  cardImageGradientFrom: string;
  cardImageGradientVia: string;
  cardImageGradientTo: string;
  // Shadow settings
  shadowColor: string;
  shadowOpacity: string;
  // Effects
  enableHoverEffects: boolean;
  enableAnimations: boolean;
  // Size and positioning
  cardWidth: string;
  cardWidthUnit: string;
  cardHeight: string;
  cardHeightUnit: string;
  cardPadding: string;
  cardPaddingUnit: string;
  // Border settings
  cardBorderWidth: string;
  cardBorderStyle: string;
  cardBorderColor: string;
  cardBorderOpacity: string;
  cardBorderRadiusTopLeft: string;
  cardBorderRadiusTopRight: string;
  cardBorderRadiusBottomLeft: string;
  cardBorderRadiusBottomRight: string;
  cardBorderRadiusUnit: string;
  // Icon settings
  iconBorderWidth: string;
  iconBorderStyle: string;
  iconBorderColor: string;
  iconBorderOpacity: string;
  iconSize: string;
  iconBorderRadius: string;
  iconBorderRadiusUnit: string;
  // Additional styling
  cardOpacity: string;
  zIndex: string;
  positionType: string;
  // Shadow details
  shadowInset: boolean;
  shadowX: string;
  shadowY: string;
  shadowBlur: string;
  shadowSpread: string;
  // Secondary shadow
  useSecondShadow: boolean;
  shadow2Inset: boolean;
  shadow2X: string;
  shadow2Y: string;
  shadow2Blur: string;
  shadow2Spread: string;
  shadow2Color: string;
  shadow2Opacity: string;
  // Custom content
  useCustomIcon: boolean;
  iconImage: string | null;
  useCustomContent: boolean;
  contentImage: string | null;
}

/**
 * Props for the CardPreview component
 */
export interface CardPreviewProps extends Omit<Card, 
  'id' | 'isActive' | 'cardBorderRadiusTopLeft' | 'cardBorderRadiusTopRight' | 
  'cardBorderRadiusBottomLeft' | 'cardBorderRadiusBottomRight' | 'cardBorderRadiusUnit'> {
  cardBorderRadius: BorderRadius;
  shadowSettings: ShadowSettings;
  shadow2Settings?: ShadowSettings;
}
