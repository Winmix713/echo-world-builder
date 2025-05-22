
# Extension Cards - React + TypeScript + Tailwind

A modern web application for creating and customizing extension cards with a powerful visual editor.

## Features

- Interactive card management system
- Visual card editor with real-time preview
- Customizable card styles, animations, and effects
- Responsive design for all device sizes

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **HeroUI** - Component library
- **React Router v6** - Navigation
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev
```

### Important Note

The project requires a `build:dev` script in package.json. Please ensure that you have the following script in your package.json:

```json
"build:dev": "vite build --mode development"
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── features/       # Feature-based modules
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── routes/         # Application routes
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## License

This project is licensed under the MIT License.
