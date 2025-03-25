const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', uri.replace(/:[^:]*@/, ':****@')); // Hide password in logs

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    console.log('Database name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB');
    console.error('Error:', error.message);
    process.exit(1);
  }); 