# VidVenture

This application is a streamlined YouTube clone built using the YouTube API. It replicates key YouTube functionalities, providing an intuitive interface for seamless video browsing, interaction, and channel management.

## Features

- **Video Discovery**: Search videos by category, availability, location, duration, order, and date.
- **Video Playback**: Stream videos with user-friendly controls.
- **Channel Interaction**: Subscribe to channels and access user-specific content, including videos and playlists.
- **Video Engagement**: Like or dislike videos to tailor content recommendations.
- **Comment System**: Engage with the community through comments, replies, and sort options.
- **Playlist Management**: Create, access, and manage playlists with shuffle and repeat features.

## Getting started

The steps below use `npm`, but you may use `yarn` or `pnpm` if you prefer.

### Prerequisites

Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (LTS version recommended)

### Installation

Install the Dependencies

In your terminal, navigate to the project directory and run:

```bash
npm install
```

This command installs all the necessary packages required to run the application.

## Running the Application

### 1. Start the Development Server

For local development with hot-reloading, run:

```bash
npm run dev
```

This starts the development server, making the application accessible at http://localhost:3000 (or the port you've configured).

### 2. Start the Production Server

For production, build the application first, then start the server

Build the application:

```bash
npm run build
```

After the build is complete, start the application:

```bash
npm start
```

This command starts the application in production mode, optimized for performance and reliability.

## Environment Setup

To run this application, you need to set up the required environment variables. Create a file named `.env.local` in the root of your project and add the following content, replacing the placeholder values with your actual credentials:

```bash
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Application URLs and API Keys
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAP_KEY=your_google_map_api_key
```

Important: Never commit your `.env.local` file or any sensitive credentials to your version control system. Ensure that `.env.local` is included in your `.gitignore` file to prevent it from being accidentally pushed to your repository.

### Obtaining Google Credentials

- **Google Client ID and Secret**: Create a project in the Google Developers Console and obtain your OAuth 2.0 credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET).

- **Google Maps API Key**: Enable the Google Maps API for your project and generate an API key (NEXT_PUBLIC_GOOGLE_MAP_KEY).

After setting up your `.env.local` file with the appropriate values, the application should be able to access these environment variables and function properly.
