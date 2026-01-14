const { MongoClient } = require('mongodb');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DATABASE || 'brolearn';

let dbInstance = null;
let clientInstance = null;

async function connectDB() {
  if (dbInstance) {
    return dbInstance;
  }
  
  try {
    clientInstance = await MongoClient.connect(connectionString);
    dbInstance = clientInstance.db(dbName);
    console.log(`Connected to MongoDB: ${dbName}`);
    return dbInstance;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function closeDB() {
  if (clientInstance) {
    await clientInstance.close();
    dbInstance = null;
    clientInstance = null;
    console.log('MongoDB connection closed');
  }
}

async function getDB() {
  if (!dbInstance) {
    return await connectDB();
  }
  return dbInstance;
}

module.exports = { connectDB, closeDB, getDB };
