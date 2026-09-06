import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex.runner',
        email: 'alex@example.com',
        displayName: 'Alex Rivera',
      },
      {
        username: 'jamie.lifts',
        email: 'jamie@example.com',
        displayName: 'Jamie Chen',
      },
      {
        username: 'sam.cyclist',
        email: 'sam@example.com',
        displayName: 'Sam Taylor',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Morning Movers',
        description: 'A friendly team for consistent early workouts.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Warriors',
        description: 'Build momentum together every weekend.',
        memberIds: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 32,
        calories: 340,
        completedAt: new Date('2026-09-04T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 280,
        completedAt: new Date('2026-09-04T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 60,
        calories: 520,
        completedAt: new Date('2026-09-05T09:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[2]._id, points: 1280, rank: 1 },
      { userId: users[0]._id, points: 1120, rank: 2 },
      { userId: users[1]._id, points: 980, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Quick Cardio Builder',
        description: 'A short interval workout for building endurance.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: [
          { name: 'Jumping jacks', repetitions: 30, sets: 3 },
          { name: 'High knees', repetitions: 30, sets: 3 },
        ],
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced strength session for the major muscle groups.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Bodyweight squats', repetitions: 12, sets: 4 },
          { name: 'Push-ups', repetitions: 10, sets: 4 },
          { name: 'Reverse lunges', repetitions: 10, sets: 3 },
        ],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 2 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
