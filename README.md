# ZPSL Fantasy ⚽

A fantasy football platform for the Zimbabwe Premier Soccer League (ZPSL). Build your dream team, compete with friends, and track real player statistics throughout the season.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)

## ✨ Features

- **Team Management** - Pick and manage your fantasy squad of 15 players
- **Live Statistics** - Real-time player stats including goals, assists, and clean sheets
- **Player Comparison** - Compare two players side-by-side with detailed statistics
- **Global Search** - Quick player search with autocomplete (`⌘K` / `Ctrl+K`)
- **Transfer Market** - Monitor price changes and transfer trends
- **Fixtures & Results** - View upcoming matches and past results
- **Leaderboards** - Compete in leagues and climb the rankings
- **Dark/Light Mode** - Full theme support for comfortable viewing

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Charts**: Recharts

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zpsl-fantasy.git
   cd zpsl-fantasy
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── fantasy/      # Fantasy-specific components (PlayerCard, PitchView, etc.)
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── ui/           # Reusable UI components (shadcn/ui)
├── contexts/         # React contexts (Auth)
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── integrations/     # External service integrations
└── lib/              # Utility functions
```

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/auth` | Authentication (Login/Register) |
| `/dashboard` | User dashboard with team overview |
| `/pick-team` | Team selection interface |
| `/transfers` | Transfer market |
| `/fixtures` | Match fixtures and results |
| `/statistics` | Player statistics and leaderboards |
| `/compare` | Player comparison tool |
| `/player/:id` | Individual player profile |
| `/profile` | User profile settings |

## 🎨 Design System

The app uses a custom design system with:
- Semantic color tokens for consistent theming
- Position-based color coding (GK: Amber, DEF: Blue, MID: Green, FWD: Red)
- Responsive design for mobile and desktop
- Smooth animations and transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

Made with ❤️ for Zimbabwe football fans
