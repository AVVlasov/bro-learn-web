const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DATABASE || 'brolearn';

async function seed() {
  let client;
  
  try {
    console.log('Connecting to MongoDB...');
    client = await MongoClient.connect(connectionString);
    const db = client.db(dbName);
    
    console.log(`Connected to database: ${dbName}`);
    
    // Загружаем данные из JSON файлов
    const modulesPath = path.join(__dirname, '../data/modules.json');
    const lessonsPath = path.join(__dirname, '../data/lessons.json');
    const exercisesPath = path.join(__dirname, '../data/exercises.json');
    
    const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf8'));
    const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
    const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));
    
    // Очищаем существующие коллекции
    console.log('Clearing existing collections...');
    await db.collection('modules').deleteMany({});
    await db.collection('lessons').deleteMany({});
    await db.collection('exercises').deleteMany({});
    
    // Вставляем модули
    console.log(`Inserting ${modules.length} modules...`);
    if (modules.length > 0) {
      await db.collection('modules').insertMany(modules);
      console.log('✓ Modules inserted');
    }
    
    // Вставляем уроки
    console.log(`Inserting ${lessons.length} lessons...`);
    if (lessons.length > 0) {
      await db.collection('lessons').insertMany(lessons);
      console.log('✓ Lessons inserted');
    }
    
    // Вставляем упражнения
    console.log(`Inserting ${exercises.length} exercises...`);
    if (exercises.length > 0) {
      await db.collection('exercises').insertMany(exercises);
      console.log('✓ Exercises inserted');
    }
    
    // Создаем индексы для оптимизации запросов
    console.log('Creating indexes...');
    await db.collection('modules').createIndex({ id: 1 }, { unique: true });
    await db.collection('modules').createIndex({ order: 1 });
    await db.collection('lessons').createIndex({ id: 1 }, { unique: true });
    await db.collection('lessons').createIndex({ moduleId: 1 });
    await db.collection('lessons').createIndex({ order: 1 });
    await db.collection('exercises').createIndex({ id: 1 }, { unique: true });
    await db.collection('exercises').createIndex({ lessonId: 1 });
    await db.collection('progress').createIndex({ userId: 1 }, { unique: true });
    console.log('✓ Indexes created');
    
    // Создаем начальный прогресс для default user
    console.log('Creating default progress...');
    const existingProgress = await db.collection('progress').findOne({ userId: 'default-user' });
    
    if (!existingProgress) {
      await db.collection('progress').insertOne({
        userId: 'default-user',
        totalXP: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: new Date(),
        completedLessons: [],
        completedExercises: [],
        achievements: []
      });
      console.log('✓ Default progress created');
    } else {
      console.log('✓ Default progress already exists, skipping...');
    }
    
    // Выводим статистику
    console.log('\n=== Seed Summary ===');
    console.log(`Modules: ${await db.collection('modules').countDocuments()}`);
    console.log(`Lessons: ${await db.collection('lessons').countDocuments()}`);
    console.log(`Exercises: ${await db.collection('exercises').countDocuments()}`);
    console.log(`Progress entries: ${await db.collection('progress').countDocuments()}`);
    console.log('\n✓ Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('Connection closed');
    }
  }
}

// Запускаем seed
seed();
