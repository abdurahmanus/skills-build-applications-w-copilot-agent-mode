import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT || 8000);

void connectDatabase();

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});