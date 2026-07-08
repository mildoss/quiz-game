# Real-Time Multiplayer Quiz Game | Frontend

## Overview

The **Real-Time Multiplayer Quiz Game** is a distributed application that allows users to compete against each other in real-time. The platform is built on a microservices architecture, consisting of two independent backend services and a frontend client.

This repository contains the **Frontend Client**. It acts as the interactive user interface, responsible for delivering a fast and seamless experience using modern web technologies like Next.js and Tailwind CSS. It manages local application state with Redux and maintains live, bidirectional communication with the backend engine via WebSockets.

## Architecture Diagram

Below is the high-level architecture of the Real-Time Multiplayer Quiz Game, demonstrating the separation of concerns and how the client interacts with the cloud and backend services.

![Architecture Diagram](./assets/quiz-architecture.png)

### Component Interaction & Data Flow:

* **Frontend (This Repo):** Built with Next.js. It communicates with the Auth Service via REST API for user registration and login. It connects to the Game Service via WebSockets for real-time gameplay synchronization.
* **Auth Service:** Processes credentials and issues stateless JSON Web Tokens (JWT).
* **Game Service:** Handles core game logic and validates JWTs locally to ensure high performance and fault tolerance.
* **BaaS Integration (Leaderboard & Stats):** To optimize performance, the frontend bypasses the Java backend for read-only operations. It fetches real-time leaderboard data directly from the Game DB using the Supabase Data API.
* **Static Assets (CDN):** Question images are delivered globally with low latency via AWS CloudFront directly to this client interface.

## Platform Features

The frontend is packed with features designed for a seamless, competitive, and real-time user experience.

### Authentication & User Management
* **Secure Access:** Full registration, login, and secure routing flows using custom authentication hooks and proxy utilities.
* **Public Profiles:** Detailed statistics cards and views displaying player performance.

### Game Lobby (Interactive UI)
* **Customizable Matches:** Dynamic forms allowing players to configure game settings and topics.
* **Live Capacity:** Real-time lobby capacity counters and waiting screens.

### Real-Time Gameplay (WebSockets)
* **Synchronized State:** The UI seamlessly reacts to strict game states driven by the backend. 
* **Live UI Updates:** Players see a visual `QuestionBoard`, interactive `AnswerGrid`, and live `Countdown` timers.
* **Round Mechanics:** Immediate visual feedback via `RoundResults` components when answers are submitted and scores are dynamically updated.

### Statistics & History
* **Global Leaderboard:** Dedicated leaderboard pages and interactive `LeaderboardCard` components displaying top players.
* **Deep Match History:** Users can browse through their history using the `RecentGamesTable`, which includes visual fallbacks for empty states.

## Tech Stack

**Core & Framework**
* **Next.js (App Router)** for scalable React-based routing and server-side rendering.
* **TypeScript** for strict type safety and reliable code architecture.

**Styling & UI**
* **Tailwind CSS** for rapid, utility-first UI styling.
* **CSS Modules/Globals** for base variables and custom visual themes.

**State Management & Data Fetching**
* **Redux Toolkit** for centralized client state management.
* Custom API Services for structured external communication.

**Real-Time Communication**
* **WebSockets** implemented via custom React Context providers.

## Project Structure

The frontend follows a clean feature-based architecture to separate routing, UI components, and global state.

```text
.
├── src/
│   ├── app/              # Next.js App Router pages (auth, game, leaderboard, stats)
│   ├── components/       # Reusable UI elements (GameLobby, QuestionBoard, AuthForm)
│   │   └── ui/           # Atomic UI parts (Buttons, Spinners, Inputs)
│   ├── hooks/            # Custom React hooks (e.g., useAuthForm)
│   ├── lib/              # Core utilities, DB clients, and auth-proxies
│   ├── providers/        # React Context providers (SocketProvider, StoreProvider)
│   ├── services/         # API fetchers (gameApi, authApi, leaderboardApi)
│   ├── store/            # Redux configuration and slices (gameSlice, authSlice)
│   └── types/            # TypeScript interfaces for models (User, Game, Auth)
├── public/               # Static assets like logos (logo.svg, logo.png)
└── tailwind.config.js    # Tailwind CSS configuration
```
## State Management & Data Flow

Instead of a database schema, the frontend relies on a strictly typed **Redux Store** combined with **React Context** to manage the application's data flow.

* **Auth Slice (`authSlice.ts`):** Manages user session tokens, login status, and current user metadata.
* **Game Slice (`gameSlice.ts`):** Acts as the local source of truth for the active game room, tracking opponent scores, the active question, and the current STOMP game state.
* **Socket Provider (`SocketProvider.tsx`):** Wraps the application to maintain a persistent WebSocket connection, catching STOMP messages from the backend and dispatching them to the Redux store.

## Local Development

### Prerequisites
Before running the project, ensure you have the following installed:
* **Node.js** (v18 or higher recommended)
* **npm** (Node Package Manager)

### Configuration & Launching

1.  **Install Dependencies:**
    Navigate to the root directory and run:
    ```bash
    npm install
    ```

2.  **Set Environment Variables:**
    Create a `.env.local` file in the root directory to store your API and WebSocket endpoints:
    ```env
    NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8080
    NEXT_PUBLIC_GAME_SERVICE_URL=http://localhost:8081
    NEXT_PUBLIC_WS_URL=ws://localhost:8081/ws-game
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Start the Development Server:**
    Run the following command to spin up the Next.js local environment:
    ```bash
    npm run dev
    ```

4.  **View the Application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Related Repositories

* [Auth Service](https://github.com/eugene-stellar/quiz-backend-auth-service) - Handles security, registration, and JWT issuance.
* [Game Service](https://github.com/eugene-stellar/quiz-backend-game-service) - Handles core game logic, WebSockets, and orchestration.
* **Frontend Client** *(This Repository)*

## License & Info

* **License:** MIT
* **Author:** [Eugene Bielichenko](https://github.com/eugene-stellar) & [Vladislav Maslo](https://github.com/mildoss)
* **Last Updated:** July 2026
