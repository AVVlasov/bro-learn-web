const express = require('express');
const app = express();

// Middleware
const timer = (time = 300) => (req, res, next) => setTimeout(next, time);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add delay for development
app.use(timer());

// Logging middleware
app.use((req, res, next) => {
  console.log(`API: ${req.method} ${req.path}`, {
    query: req.query,
    body: Object.keys(req.body).length > 0 ? req.body : undefined
  });
  next();
});

// Import routes
const modulesRouter = require('./routes/modules');
const lessonsRouter = require('./routes/lessons');
const exercisesRouter = require('./routes/exercises');
const progressRouter = require('./routes/progress');
const achievementsRouter = require('./routes/achievements');
const statsRouter = require('./routes/stats');

// Mount routes - без префикса /api, так как brojs сам добавит
app.use(modulesRouter);
app.use(lessonsRouter);
app.use(exercisesRouter);
app.use(progressRouter);
app.use(achievementsRouter);
app.use(statsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
