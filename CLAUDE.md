# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Vite
- `pnpm build` - Build for production (TypeScript compilation + Vite build)
- `pnpm lint` - Run ESLint on all files
- `pnpm preview` - Preview production build locally

### Package Management
- Uses `pnpm` as package manager (not npm/yarn)
- Dependencies managed in `package.json`

## Project Architecture

### Core Technology Stack
- **React 19** with TypeScript and Vite
- **React Router DOM** for client-side routing (`/`, `/games`, `/blog`, `/about`, `/privacy`, `/cookie`, `/contact`)
- **ESLint** for code quality (configured in `eslint.config.js`)
- **Vercel Analytics** for tracking

### Application Structure
This is a gaming portal featuring multiple Italian Brainrot-themed games:
- Primary sliding puzzle game with character gallery
- External Unity WebGL games (BrainRotMerge) via iframe embedding
- Expandable architecture for adding more games

#### Key Components
- `App.tsx` - Main application with routing and game controls
- `PuzzleBoard.tsx` - Core puzzle game logic with drag-and-drop functionality
- `ImageGallery.tsx` - Auto-scrolling two-row image gallery with character selection
- `Games.tsx` - Games hub page showcasing multiple Brainrot games
- `Blog.tsx` - Comprehensive Italian Brainrot educational content
- Static pages: `AboutUs.tsx`, `PrivacyPolicy.tsx`, `CookiePolicy.tsx`, `Contact.tsx`

#### Asset Management
- **Images**: `/public/puzzles/img1.webp` through `img10.webp`
- **Music**: `/public/music/bgm1.mp3` through `bgm10.mp3`
- Images and music are automatically paired by number (img1 → bgm1, etc.)
- Uses Vite's `import.meta.glob()` for dynamic asset loading

#### Game Features
- 3x3 sliding puzzle with canvas-based image slicing
- Drag-and-drop tile movement with mouse/touch support
- Auto-scrolling image gallery with two rows (opposite directions)
- Interactive character selection from gallery
- Timer tracking and completion detection
- Music controls with auto-pairing to puzzle images
- Modal completion dialog with statistics
- Responsive design with inline styles

#### Technical Details
- Heavy use of inline styles throughout (no CSS modules/styled-components)
- Canvas API for image manipulation and tile generation
- Touch events handled for mobile compatibility
- React refs for component communication between App and PuzzleBoard
- Portal rendering for music controls placement

### Development Notes
- No test framework currently configured
- TypeScript strict mode enabled
- All styling done inline - no external CSS frameworks
- Mobile-first responsive design approach