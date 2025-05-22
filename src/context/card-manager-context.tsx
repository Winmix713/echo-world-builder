import React from 'react';

// Define the card type
export interface Card {
  id: string;
  type: 'obsidian' | 'figma' | 'redis' | 'terminal' | 'docker';
  title: string;
  description: string;
  delay: string;
  isActive: boolean;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgOpacityFrom: string;
  bgOpacityTo: string;
  iconGradientFrom: string;
  iconGradientTo: string;
  cardImageGradientFrom: string;
  cardImageGradientVia: string;
  cardImageGradientTo: string;
  shadowColor: string;
  shadowOpacity: string;
  enableHoverEffects: boolean;
  enableAnimations: boolean;
  
  // Additional properties
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
  iconImage?: string | null;
  contentImage?: string | null;
}

// Define the context type
interface CardManagerContextType {
  cards: Card[];
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
  updateCard: (card: Card) => void;
  resetCardToDefault: (id: string) => void;
  createNewCard: (cardData: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  toggleCardActive: (id: string) => void;
}

// Create the context
export const CardManager = React.createContext<CardManagerContextType>({
  cards: [],
  activeCardId: null,
  setActiveCardId: () => {},
  updateCard: () => {},
  resetCardToDefault: () => {},
  createNewCard: () => {},
  deleteCard: () => {},
  toggleCardActive: () => {}
});

// Default cards data
const defaultCards: Card[] = [
  {
    id: '1',
    type: 'obsidian',
    title: 'Obsidian',
    description: 'Capture information, manage tasks and pin notes to your menu bar.',
    delay: '1220ms',
    isActive: true,
    bgGradientFrom: '#523091',
    bgGradientTo: '#1a0b33',
    bgOpacityFrom: '0.70',
    bgOpacityTo: '0.14',
    iconGradientFrom: '#7c3aed',
    iconGradientTo: '#a855f7',
    cardImageGradientFrom: '#4C1D95',
    cardImageGradientVia: '#7C3AED',
    cardImageGradientTo: '#A855F7',
    shadowColor: '#7c3aed',
    shadowOpacity: '0.3',
    enableHoverEffects: true,
    enableAnimations: true
  },
  {
    id: '2',
    type: 'figma',
    title: 'Figma File Search',
    description: 'Quickly open a Figma file from anywhere on your Mac.',
    delay: '580ms',
    isActive: true,
    bgGradientFrom: '#192935',
    bgGradientTo: '#121922',
    bgOpacityFrom: '0.70',
    bgOpacityTo: '0.07',
    iconGradientFrom: '#1e293b',
    iconGradientTo: '#334155',
    cardImageGradientFrom: '#0f172a',
    cardImageGradientVia: '#1e293b',
    cardImageGradientTo: '#334155',
    shadowColor: '#1abcfe',
    shadowOpacity: '0.3',
    enableHoverEffects: true,
    enableAnimations: true
  },
  {
    id: '3',
    type: 'redis',
    title: 'Redis',
    description: 'Fast in-memory data structure store and caching solution.',
    delay: '940ms',
    isActive: true,
    bgGradientFrom: '#913030',
    bgGradientTo: '#330b0b',
    bgOpacityFrom: '0.70',
    bgOpacityTo: '0.14',
    iconGradientFrom: '#dc2626',
    iconGradientTo: '#ef4444',
    cardImageGradientFrom: '#7f1d1d',
    cardImageGradientVia: '#dc2626',
    cardImageGradientTo: '#ef4444',
    shadowColor: '#ed3a3a',
    shadowOpacity: '0.3',
    enableHoverEffects: true,
    enableAnimations: true
  },
  {
    id: '4',
    type: 'terminal',
    title: 'Terminal',
    description: 'Powerful command-line terminal with advanced features.',
    delay: '1500ms',
    isActive: true,
    bgGradientFrom: '#404040',
    bgGradientTo: '#181818',
    bgOpacityFrom: '0.70',
    bgOpacityTo: '0.07',
    iconGradientFrom: '#374151',
    iconGradientTo: '#6b7280',
    cardImageGradientFrom: '#1f2937',
    cardImageGradientVia: '#374151',
    cardImageGradientTo: '#6b7280',
    shadowColor: '#a0a0a0',
    shadowOpacity: '0.3',
    enableHoverEffects: true,
    enableAnimations: true
  },
  {
    id: '5',
    type: 'docker',
    title: 'Docker',
    description: 'Containerize applications for consistent deployment.',
    delay: '340ms',
    isActive: true,
    bgGradientFrom: '#307891',
    bgGradientTo: '#0b1e33',
    bgOpacityFrom: '0.70',
    bgOpacityTo: '0.14',
    iconGradientFrom: '#0ea5e9',
    iconGradientTo: '#3b82f6',
    cardImageGradientFrom: '#0c4a6e',
    cardImageGradientVia: '#0ea5e9',
    cardImageGradientTo: '#3b82f6',
    shadowColor: '#3abced',
    shadowOpacity: '0.3',
    enableHoverEffects: true,
    enableAnimations: true
  }
];

// Create the provider component
export const CardManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for cards
  const [cards, setCards] = React.useState<Card[]>(() => {
    // Try to load cards from localStorage
    const savedCards = localStorage.getItem('extensionCards');
    return savedCards ? JSON.parse(savedCards) : defaultCards;
  });
  
  // State for active card
  const [activeCardId, setActiveCardId] = React.useState<string | null>(cards[0]?.id || null);
  
  // Save cards to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('extensionCards', JSON.stringify(cards));
  }, [cards]);
  
  // Update a card
  const updateCard = (updatedCard: Card) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === updatedCard.id ? { ...updatedCard } : card
      )
    );
  };
  
  // Reset a card to its default settings
  const resetCardToDefault = (id: string) => {
    const defaultCard = defaultCards.find(card => card.id === id);
    
    if (defaultCard) {
      // Use the default card with the same ID
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? { ...defaultCard } : card
        )
      );
    } else {
      // If not found in defaults (it's a new card), find its type and use default values for that type
      const cardToReset = cards.find(card => card.id === id);
      if (!cardToReset) return;
      
      const typeDefault = defaultCards.find(card => card.type === cardToReset.type);
      if (!typeDefault) return;
      
      // Keep the ID, title, description, and type, but reset all other properties
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? {
            ...typeDefault,
            id,
            title: card.title,
            description: card.description,
            type: card.type,
            isActive: card.isActive
          } : card
        )
      );
    }
  };
  
  // Create a new card
  const createNewCard = (cardData: Partial<Card>) => {
    // Find a default card of the same type to use as a base
    const typeDefault = defaultCards.find(card => card.type === cardData.type);
    
    if (!typeDefault) return;
    
    // Generate a unique ID
    const newId = String(Date.now());
    
    // Create the new card
    const newCard: Card = {
      ...typeDefault,
      id: newId,
      title: cardData.title || typeDefault.title,
      description: cardData.description || typeDefault.description,
      type: cardData.type || typeDefault.type,
      delay: cardData.delay || typeDefault.delay,
      isActive: true
    };
    
    // Add the new card to the list
    setCards(prevCards => [...prevCards, newCard]);
    
    // Set the new card as active
    setActiveCardId(newId);
  };
  
  // Delete a card
  const deleteCard = (id: string) => {
    // Check if this is one of the default cards (1-5)
    const isDefaultCard = ['1', '2', '3', '4', '5'].includes(id);
    
    if (isDefaultCard) {
      // For default cards, just set them as inactive instead of deleting
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? { ...card, isActive: false } : card
        )
      );
    } else {
      // For custom cards, actually remove them
      setCards(prevCards => prevCards.filter(card => card.id !== id));
    }
    
    // If the deleted card was active, set the first card as active
    if (activeCardId === id) {
      const remainingCards = cards.filter(card => card.id !== id);
      setActiveCardId(remainingCards[0]?.id || null);
    }
  };
  
  // Toggle a card's active state
  const toggleCardActive = (id: string) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isActive: !card.isActive } : card
      )
    );
  };
  
  return (
    <CardManager.Provider value={{
      cards,
      activeCardId,
      setActiveCardId,
      updateCard,
      resetCardToDefault,
      createNewCard,
      deleteCard,
      toggleCardActive
    }}>
      {children}
    </CardManager.Provider>
  );
};