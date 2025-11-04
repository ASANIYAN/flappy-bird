# Flappy Bird

**A responsive Flappy Bird game built with React, TypeScript, and Zustand with collision detection and smooth animations.**

A modern recreation of the classic Flappy Bird game. This implementation is responsive design, has smooth animations, and pixel-perfect collision detection while maintaining the gameplay of the original.

## Game Features

- **Responsive Design**: Scales perfectly across all devices (mobile, tablet, desktop)
- **Pixel-Perfect Physics**: Accurate collision detection and smooth bird movement
- **Cross-Platform Input**: Space bar, mouse clicks, and touch events support
- **Animated UI**: Smooth transitions between game states using CSS animations
- **Score Tracking**: high score persistence

## Tech Stack

### Core Technologies

- **React**
- **TypeScript**
- **Vite**

### State Management

- **Zustand** - Lightweight state management for game logic
  - `gameStateStore` - Game status, scores, and UI states
  - `birdStore` - Bird position and physics
  - `pipeStore` - Pipe generation and movement

### Styling & UI

- **Tailwind CSS**
- **CSS Animations**
- **SVG Assets**

## Architecture

### Component Structure

```
src/
├── components/           # Game entities
│   ├── bird.tsx         # Bird component with physics
│   ├── pipe.tsx         # Pipe rendering component
│   ├── StartScreen.tsx  # Game start interface
│   └── GameOverScreen.tsx # Game over interface
├── hooks/               # Custom game logic hooks
│   ├── useGameStart.ts  # Main game loop and collision detection
│   └── useSpaceBarTap.ts # Input handling (keyboard/mouse/touch)
├── store/               # Zustand state stores
│   ├── gameStateStore.ts # Game state management
│   ├── birdStore.ts     # Bird physics state
│   └── pipeStore.ts     # Pipe management
├── layouts/             # Layout components
│   └── layout.tsx       # Responsive game container
└── lib/                 # Game constants and utilities
    └── constants.ts     # Game physics constants
```

### Design Patterns

#### **Custom Hooks Pattern**

Game logic is encapsulated in custom hooks for reusability and separation of concerns:

- `useGameStart()` - Manages the main game loop, collision detection, and pipe spawning
- `useSpaceBarTap()` - Handles all input events across different platforms

#### **Store-Based State Management**

Zustand stores provide clean, predictable state management:

- Immutable state updates
- TypeScript interfaces for type safety
- Separation of concerns between game entities

#### **Responsive Scaling Strategy**

- Game logic operates in fixed pixel coordinates (400×750px)
- CSS `transform: scale()` handles all responsive scaling
- Maintains pixel-perfect collision detection across all screen sizes

## Styling Philosophy

### **Utility-First Approach**

- Tailwind CSS for rapid prototyping and consistent design
- Custom CSS for complex animations and game-specific styling
- Component-scoped styles for better maintainability

### **Animation Strategy**

- CSS keyframes for smooth, performant animations
- Staggered animations for engaging user experience
- Transform-based animations for optimal performance

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Game Controls

- **Desktop**: Space bar or mouse click to flap
- **Mobile**: Tap anywhere on screen to flap
- **Start Game**: Click play button or use any input method
