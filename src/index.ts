import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import { config } from './config/server';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import sessionRoutes from './routes/session.routes';

// Initialize express app
const app = express();

// Enhanced startup logging
console.log('=== Server Startup ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set (hidden for security)' : 'Not set');
console.log('Frontend URL:', process.env.FRONTEND_URL);
console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set (hidden for security)' : 'Not set');

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  process.exit(1);
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced health check endpoint
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    mongodb: {
      status: statusMap[mongoStatus] || 'unknown',
      readyState: mongoStatus,
      host: mongoose.connection.host || 'not connected'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection with enhanced retry logic
const connectWithRetry = async () => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log(`MongoDB connection attempt ${retries + 1}/${maxRetries}`);
      
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
      }

      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10
      });
      
      console.log('=== MongoDB Connection Successful ===');
      console.log('Connected to:', mongoose.connection.host);
      console.log('Database:', mongoose.connection.name);
      return true;
    } catch (error) {
      retries++;
      console.error('=== MongoDB Connection Error ===');
      console.error('Error:', error.message);
      console.error('Stack:', error.stack);
      
      if (retries === maxRetries) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      
      console.log(`Retrying in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// Start server only after successful MongoDB connection
const startServer = async () => {
  try {
    await connectWithRetry();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log('=== Server Started Successfully ===');
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('=== Server Startup Failed ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

startServer(); 