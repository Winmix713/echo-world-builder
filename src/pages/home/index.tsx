import React from 'react';
import { Icon } from '@iconify/react';
import { ExtensionCard } from '../../components/extension-card';
import { CardManager } from '../../context/card-manager-context';

function HomePage() {
  // Get cards from context
  const { cards } = React.useContext(CardManager);
  
  // Filter only active cards
  const activeCards = cards.filter(card => card.isActive);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#0d0d21] flex items-center justify-center p-5">
      <div className="flex flex-wrap gap-6 justify-center items-start max-w-6xl">
        {activeCards.map(card => (
          <ExtensionCard 
            key={card.id}
            type={card.type} 
            title={card.title} 
            description={card.description}
            delay={card.delay}
            icon={
              card.iconImage ? (
                <img 
                  src={card.iconImage} 
                  alt={card.title} 
                  className="max-w-full max-h-full object-cover"
                />
              ) : (
                getDefaultIcon(card.type)
              )
            }
            customContent={card.contentImage}
            // Pass additional props if they exist
            cardStyles={{
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
              cardBorderRadius: card.cardBorderRadius,
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
              shadowSettings: card.shadowSettings,
              shadow2Settings: card.shadow2Settings
            }}
          >
            {card.contentImage ? (
              <div className="w-full h-full">
                <img 
                  src={card.contentImage} 
                  alt={card.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              getDefaultContent(card.type)
            )}
          </ExtensionCard>
        ))}
      </div>
    </div>
  );
}

// Helper function to get default icon based on type
function getDefaultIcon(type: string) {
  switch (type) {
    case 'obsidian':
      return <span className="text-2xl font-bold">O</span>;
    case 'figma':
      return (
        <div className="w-[28px] h-[28px] relative transition-transform duration-300 ease-in-out group-hover:scale-110 group-active:scale-90">
          <div className="absolute w-[12px] h-[12px] bg-[#ff5757] top-0 left-[8px] rounded-[6px_6px_0_0] transition-all duration-300 ease-in-out group-hover:bg-[#ff6b6b] group-hover:shadow-[0_0_12px_rgba(255,87,87,0.6)]"></div>
          <div className="absolute w-[12px] h-[12px] bg-[#ff8c42] top-0 right-0 rounded-[6px_6px_6px_0] transition-all duration-300 ease-in-out group-hover:bg-[#ffa726] group-hover:shadow-[0_0_12px_rgba(255,140,66,0.6)]"></div>
          <div className="absolute w-[12px] h-[12px] bg-[#a259ff] top-[8px] left-0 rounded-[6px_0_6px_6px] transition-all duration-300 ease-in-out group-hover:bg-[#b569ff] group-hover:shadow-[0_0_12px_rgba(162,89,255,0.6)]"></div>
          <div className="absolute w-[12px] h-[12px] bg-[#1abcfe] top-[8px] right-[8px] rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#29c5fe] group-hover:shadow-[0_0_12px_rgba(26,188,254,0.6)]"></div>
          <div className="absolute w-[12px] h-[12px] bg-[#0acf83] bottom-0 left-[8px] rounded-[0_0_6px_6px] transition-all duration-300 ease-in-out group-hover:bg-[#1dd490] group-hover:shadow-[0_0_12px_rgba(10,207,131,0.6)]"></div>
        </div>
      );
    case 'redis':
      return <span className="text-2xl font-bold">R</span>;
    case 'terminal':
      return <span className="text-xl font-bold">$</span>;
    case 'docker':
      return <span className="text-2xl">🐳</span>;
    default:
      return <span className="text-2xl">?</span>;
  }
}

// Helper function to get default content based on type
function getDefaultContent(type: string) {
  switch (type) {
    case 'obsidian':
      return (
        <div className="relative">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_70%)] animate-pulse transition-all duration-300 ease-in-out"></div>
          <div className="w-[120px] h-[120px] relative filter drop-shadow-[0_8px_32px_rgba(124,58,237,0.4)] transition-all duration-400 ease-in-out group-hover:filter-drop-shadow-[0_12px_48px_rgba(124,58,237,0.7)] group-hover:scale-110 group-active:scale-105">
            <div className="w-full h-full bg-gradient-to-br from-[#a855f7] via-[#7c3aed] to-[#5b21b6] clip-path-crystal animate-float transition-all duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-[#c084fc] group-hover:via-[#a855f7] group-hover:to-[#7c3aed] group-hover:animate-float-fast relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
                <div className="absolute w-[30px] h-[2px] top-[30%] left-[25%] bg-white/10 rounded-[20px] rotate-45 transition-all duration-300 ease-in-out group-hover:bg-white/20 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
                <div className="absolute w-[25px] h-[2px] top-[45%] right-[20%] bg-white/10 rounded-[20px] -rotate-30 transition-all duration-300 ease-in-out group-hover:bg-white/20 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
                <div className="absolute w-[35px] h-[2px] bottom-[35%] left-[30%] bg-white/10 rounded-[20px] rotate-15 transition-all duration-300 ease-in-out group-hover:bg-white/20 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent clip-path-crystal transition-bg duration-300 ease-in-out group-hover:from-white/50"></div>
            </div>
          </div>
        </div>
      );
    case 'figma':
      return (
        <div className="relative">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(26,188,254,0.2)_0%,transparent_70%)] animate-pulse transition-all duration-300 ease-in-out opacity-20"></div>
          <div className="absolute left-5 top-5 w-[60px] h-[120px]">
            <div className="absolute w-[40px] h-[20px] bg-[#ff5757] rounded-[20px] top-0 animate-float-shapes transition-all duration-300 ease-in-out group-hover:animate-float-shapes-fast group-hover:bg-[#ff6b6b] group-hover:shadow-[0_0_16px_rgba(255,87,87,0.6)]"></div>
            <div className="absolute w-[35px] h-[35px] bg-[#a259ff] top-[25px] left-[-5px] rounded-full animate-float-shapes transition-all duration-300 ease-in-out animation-delay-500 group-hover:animate-float-shapes-fast group-hover:bg-[#b569ff] group-hover:shadow-[0_0_16px_rgba(162,89,255,0.6)]"></div>
            <div className="absolute w-[25px] h-[25px] bg-[#1abcfe] top-[50px] right-0 rounded-full animate-float-shapes transition-all duration-300 ease-in-out animation-delay-1000 group-hover:animate-float-shapes-fast group-hover:bg-[#29c5fe] group-hover:shadow-[0_0_16px_rgba(26,188,254,0.6)]"></div>
            <div className="absolute w-[30px] h-[30px] bg-[#0acf83] bottom-0 left-[5px] rounded-full animate-float-shapes transition-all duration-300 ease-in-out animation-delay-1500 group-hover:animate-float-shapes-fast group-hover:bg-[#1dd490] group-hover:shadow-[0_0_16px_rgba(10,207,131,0.6)]"></div>
          </div>
          <div className="w-[280px] h-[140px] relative bg-[rgba(30,41,59,0.8)] rounded-xl backdrop-blur-[10px] border border-white/10 p-4 transition-all duration-300 ease-in-out group-hover:bg-[rgba(51,65,85,0.9)] group-hover:border-white/20 group-hover:scale-102 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="bg-[rgba(51,65,85,0.8)] rounded-lg py-2 px-3 mb-3 flex items-center gap-2 border border-white/10 transition-all duration-300 ease-in-out group-hover:bg-[rgba(71,85,105,0.9)] group-hover:border-white/20 group-hover:shadow-[0_0_8px_rgba(26,188,254,0.2)]">
              <div className="w-4 h-4 bg-[#1abcfe] rounded-full relative transition-all duration-300 ease-in-out group-hover:bg-[#29c5fe] group-hover:shadow-[0_0_8px_rgba(26,188,254,0.5)]">
                <div className="absolute top-0.5 left-0.5 w-3 h-3 border-2 border-white rounded-full border-b-transparent border-r-transparent"></div>
              </div>
              <div className="text-white/60 text-xs transition-color duration-300 ease-in-out group-hover:text-white/80">Filter files by name</div>
            </div>
            <div className="text-white/50 text-[11px] mb-2 transition-color duration-300 ease-in-out group-hover:text-white/70">Recent Files 3</div>
            <div className="bg-[rgba(15,23,42,0.8)] rounded-md p-2 flex items-center justify-between border border-white/8 transition-all duration-300 ease-in-out group-hover:bg-[rgba(30,41,59,0.9)] group-hover:border-white/15 group-hover:translate-x-1">
              <div className="text-white text-xs font-medium transition-color duration-300 ease-in-out group-hover:text-[#f1f5f9]">Design System</div>
              <div className="bg-[#0acf83] text-white text-[10px] py-0.5 px-1.5 rounded flex items-center gap-1 transition-all duration-300 ease-in-out group-hover:bg-[#1dd490] group-hover:shadow-[0_0_8px_rgba(10,207,131,0.4)]">
                <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 ease-in-out group-hover:bg-[#f8fafc] group-hover:shadow-[0_0_4px_rgba(255,255,255,0.6)]"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'redis':
      return (
        <div className="relative">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(237,58,58,0.3)_0%,transparent_70%)] animate-pulse transition-all duration-300 ease-in-out"></div>
          <div className="w-[120px] h-[120px] relative">
            <div className="w-[80px] h-[80px] relative transform-style-3d animate-rotate-cube mx-auto my-5 group-hover:animation-duration-3s">
              <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg bg-gradient-to-br from-[#ef4444] to-[#dc2626] transform translate-z-40px group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
              <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg bg-gradient-to-br from-[#dc2626] to-[#b91c1c] transform rotate-y-180 translate-z-40px group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
              <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg bg-gradient-to-br from-[#b91c1c] to-[#991b1b] transform rotate-y-minus-90 translate-z-40px group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
              <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg bg-gradient-to-br from-[#f87171] to-[#ef4444] transform rotate-y-90 translate-z-40px group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
              <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg bg-gradient-to-br from-[#fca5a5] to-[#f87171] transform rotate-x-90 translate-z-40px group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
              <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg bg-gradient-to-br from-[#991b1b] to-[#7f1d1d] transform rotate-x-minus-90 translate-z-40px group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
            </div>
          </div>
        </div>
      );
    case 'terminal':
      return (
        <div className="absolute bottom-[-50px] left-[-21px] w-[360px] h-[324px] opacity-0 transition-[transform_.2s_ease-out,opacity_.4s_ease-out] z-[1] overflow-hidden text-[13px] text-[var(--grey-200)] bg-[hsla(0,0%,100%,.1)] backdrop-blur-[36px] border border-[hsla(270,2%,56%,.2)] rounded-[12px] shadow-[0_0_0_.5px_rgba(0,0,0,.8),0_4px_40px_8px_rgba(0,0,0,.4)] transform-gpu group-hover:opacity-100">
          <div className="w-[280px] h-[140px] bg-[rgba(31,41,59,0.9)] rounded-xl border border-white/10 overflow-hidden font-mono text-[11px] backdrop-blur-[10px] transition-all duration-300 ease-in-out group-hover:bg-[rgba(55,65,81,0.95)] group-hover:border-white/20 group-hover:scale-102">
            <div className="h-7 bg-[rgba(15,23,42,0.8)] flex items-center px-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] transition-all duration-300 ease-in-out group-hover:bg-[#ff6b6b] group-hover:shadow-[0_0_8px_rgba(255,95,87,0.5)]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] transition-all duration-300 ease-in-out group-hover:bg-[#ffd93d] group-hover:shadow-[0_0_8px_rgba(255,189,46,0.5)]"></span>
                <span className="w-3 h-3 rounded-full bg-[#28ca42] transition-all duration-300 ease-in-out group-hover:bg-[#32d74b] group-hover:shadow-[0_0_8px_rgba(40,202,66,0.5)]"></span>
              </div>
            </div>
            <div className="p-3 text-[#e2e8f0]">
              <div className="mb-1 flex items-center">
                <span className="text-[#10b981] mr-2 group-hover:text-[#34d399] group-hover:text-shadow-[0_0_4px_rgba(16,185,129,0.4)]">user@mac:</span>
                <span className="text-[#3b82f6] group-hover:text-[#60a5fa] group-hover:text-shadow-[0_0_4px_rgba(59,130,246,0.4)]">npm start</span>
              </div>
              <div className="mb-1">
                <span className="text-[#94a3b8]">Server running on port 3000</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#10b981] mr-2 group-hover:text-[#34d399] group-hover:text-shadow-[0_0_4px_rgba(16,185,129,0.4)]">user@mac:</span>
                <span className="text-[#f59e0b] animate-blink group-hover:text-[#fbbf24]">|</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 'docker':
      return (
        <div className="relative opacity-0 transform-origin-top-right animate-[ExtensionHighlight_slideIn__jf_v9_.7s_var(--delay)_cubic-bezier(.215,.61,.355,1)_forwards]">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(58,188,237,0.3)_0%,transparent_70%)] animate-pulse transition-all duration-300 ease-in-out"></div>
          <div className="w-[200px] h-[120px] relative flex items-center justify-center">
            <div className="relative w-[160px] h-[100px]">
              <div className="absolute w-[140px] h-6 rounded-xl flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white/20 transition-all duration-300 ease-in-out animate-float-containers bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] top-0 z-[3] animation-delay-0 group-hover:border-white/40 group-hover:animation-duration-2-5s group-hover:translate-x-1 group-hover:bg-gradient-to-br group-hover:from-[#60a5fa] group-hover:to-[#3b82f6] group-hover:shadow-[0_0_16px_rgba(59,130,246,0.4)]">
                <div className="text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">app</div>
              </div>
              <div className="absolute w-[140px] h-6 rounded-xl flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white/20 transition-all duration-300 ease-in-out animate-float-containers bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] top-7 z-[2] animation-delay-500 group-hover:border-white/40 group-hover:animation-duration-2-5s group-hover:translate-x-1 group-hover:bg-gradient-to-br group-hover:from-[#38bdf8] group-hover:to-[#0ea5e9] group-hover:shadow-[0_0_16px_rgba(14,165,233,0.4)]">
                <div className="text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">db</div>
              </div>
              <div className="absolute w-[140px] h-6 rounded-xl flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white/20 transition-all duration-300 ease-in-out animate-float-containers bg-gradient-to-br from-[#06b6d4] to-[#0891b2] top-14 z-[1] animation-delay-1000 group-hover:border-white/40 group-hover:animation-duration-2-5s group-hover:translate-x-1 group-hover:bg-gradient-to-br group-hover:from-[#22d3ee] group-hover:to-[#06b6d4] group-hover:shadow-[0_0_16px_rgba(6,182,212,0.4)]">
                <div className="text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">api</div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <div className="w-full h-full flex items-center justify-center text-white/50">No content</div>;
  }
}

export default HomePage;