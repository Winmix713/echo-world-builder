
/// <reference types="vite/client" />

// This file provides additional type declarations for the project
// without modifying the read-only tsconfig.json file

// Ensure HeroUI components are properly typed
declare module '@heroui/react' {
  import * as React from 'react';
  
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    endContent?: React.ReactNode;
    onValueChange?: (value: string) => void;
    className?: string;
  }
  
  export const Input: React.FC<InputProps>;
  
  export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: React.ReactNode;
    selectedKeys?: string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
  }
  
  export const Select: React.FC<SelectProps>;
  
  export interface SelectItemProps {
    key: string;
    value: string;
    children: React.ReactNode;
  }
  
  export const SelectItem: React.FC<SelectItemProps>;
  
  export interface SwitchProps {
    isSelected?: boolean;
    onValueChange?: (value: boolean) => void;
    children?: React.ReactNode;
  }
  
  export const Switch: React.FC<SwitchProps>;
  
  export interface CheckboxProps {
    isSelected?: boolean;
    onValueChange?: (value: boolean) => void;
    children?: React.ReactNode;
  }
  
  export const Checkbox: React.FC<CheckboxProps>;
  
  export interface DividerProps {
    className?: string;
  }
  
  export const Divider: React.FC<DividerProps>;
  
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    as?: React.ElementType;
    to?: string;
    color?: string;
    variant?: string;
    children: React.ReactNode;
    className?: string;
  }
  
  export const Button: React.FC<ButtonProps>;
}
