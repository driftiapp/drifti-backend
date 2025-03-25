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

### Health Check
- `GET /health` - Health check endpoint
  - Returns server status, MongoDB connection status, and uptime
  - Response: `{ status: 'ok', timestamp: string, uptime: number, environment: string, mongodb: { status: string, readyState: number, host: string } }`

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Sessions
- `GET /api/sessions` - Get user sessions
- `POST /api/sessions` - Create new session
- `DELETE /api/sessions/:id` - End session

## Security Features

The application implements several security measures:

1. **Helmet.js**
   - Sets various HTTP headers for security
   - Prevents clickjacking
   - Disables XSS filtering
   - Enables HSTS

2. **CORS**
   - Configurable CORS policy
   - Prevents unauthorized cross-origin requests

3. **Rate Limiting**
   - Prevents brute force attacks
   - Limits request frequency

4. **Error Handling**
   - Centralized error handling
   - Secure error responses
   - No sensitive information leakage

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Git Workflow
1. Create feature branch from main
2. Make changes and commit with descriptive messages
3. Push changes and create pull request
4. Get code review
5. Merge to main after approval

### Testing
- Write unit tests for new features
- Run tests before committing
- Maintain test coverage above 80%

## Deployment

The application is deployed on Render.com. Environment variables should be configured in the Render dashboard.

### Deployment Checklist
1. Set all required environment variables
2. Configure MongoDB Atlas network access
3. Set up proper CORS origins
4. Enable HTTPS
5. Configure proper logging

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 