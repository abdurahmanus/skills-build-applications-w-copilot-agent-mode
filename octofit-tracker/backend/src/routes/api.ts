import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();
type ResourceModel = Model<Record<string, unknown>>;

const resources: Record<string, ResourceModel> = {
  users: User as ResourceModel,
  teams: Team as ResourceModel,
  activities: Activity as ResourceModel,
  leaderboard: Leaderboard as ResourceModel,
  workouts: Workout as ResourceModel,
};

router.get('/', (_request, response) => {
  response.json({ service: 'octofit-api', status: 'ok' });
});

for (const [resourceName, resourceModel] of Object.entries(resources)) {
  router.get(`/${resourceName}`, async (_request, response, next) => {
    try {
      const records = await resourceModel.find().sort({ createdAt: -1 }).lean();
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  router.post(`/${resourceName}`, async (request, response, next) => {
    try {
      const record = await resourceModel.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });
}

export default router;