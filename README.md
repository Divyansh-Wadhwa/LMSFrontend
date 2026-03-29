# TRIAD LMS

A comprehensive Learning Management System built with React, TypeScript, and modern web technologies.

## Features

- **Authentication**: Secure login/logout with JWT tokens
- **Dashboard**: Overview of user progress and statistics
- **Problem Solving**: Coding problems with multiple difficulty levels
- **IDE**: Integrated development environment with Monaco Editor
- **Assessments**: Timed tests and quizzes
- **Learning**: Courses and modules
- **Resources**: Educational materials and downloads
- **Leaderboard**: Performance rankings
- **Discussion**: Forum and communication tools

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Zustand
- **Routing**: React Router v7
- **HTTP Client**: Axios with React Query
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **UI Components**: Custom component library

## Project Structure

```
src/
├── app/                     # App-level setup
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx
│   └── providers.tsx
├── layouts/                 # Layout systems
│   ├── AppLayout.tsx
│   ├── WorkspaceLayout.tsx
│   └── AuthLayout.tsx
├── components/
│   ├── ui/                  # Pure reusable UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Badge.tsx
│   │   └── Spinner.tsx
│   └── shared/              # Reusable across features
│       ├── Sidebar.tsx
│       ├── Topbar.tsx
│       ├── PageHeader.tsx
│       ├── EmptyState.tsx
│       └── ErrorState.tsx
├── features/                # Core business logic
│   ├── auth/
│   ├── dashboard/
│   ├── problems/
│   ├── ide/
│   ├── assessments/
│   ├── learn/
│   ├── resources/
│   ├── leaderboard/
│   └── discussion/
├── services/                # Global API setup
├── store/                   # Zustand stores
├── hooks/                   # Global reusable hooks
├── types/                   # Global types
├── utils/                   # Helpers
└── styles/                  # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Architecture

This application follows a feature-driven architecture with clear separation of concerns:

- **UI Components**: Pure, reusable components without business logic
- **Shared Components**: Reusable components that may contain some logic
- **Features**: Self-contained modules with their own components, hooks, services, and pages
- **Global**: Cross-cutting concerns like API services, state management, and utilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
