
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { Icon } from '@iconify/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that provides a consistent structure across pages
 * including navigation bar and content container.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#0d0d21]">
      <Navbar maxWidth="xl" className="bg-[#1e1e2e]/80 backdrop-blur-md border-b border-white/10">
        <NavbarBrand>
          <Icon icon="lucide:layers" className="text-white text-2xl mr-2" />
          <p className="font-bold text-white">Extension Cards</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/" color="foreground" className="text-white/80 hover:text-white">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/editor" color="foreground" className="text-white/80 hover:text-white">
              Card Editor
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
