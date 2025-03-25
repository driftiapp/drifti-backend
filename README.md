# Drifti Backend

Backend server for the Drifti application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/driftiapp/drifti-backend.git
cd drifti-backend
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development with hot-reload:
```bash
npm run dev
```

## Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── routes/         # API routes
└── index.ts        # Application entry point
```

## Available Scripts

- `npm start` - Start the production server
- `npm run build` - Build the TypeScript code
- `npm run dev` - Start the development server with hot-reload
- `npm test` - Run tests

## API Endpoints

- `GET /health` - Health check endpoint
- More endpoints to be documented...

## Deployment

The application is deployed on Render.com. Environment variables should be configured in the Render dashboard. 