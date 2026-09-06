import { pathToFileURL } from 'node:url';
import app from './app.js';
import { connectDatabase } from './config/database.js';

export function getApiBaseUrl(port = 8000): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-${port}.app.github.dev` : `http://localhost:${port}`;
}

const port = Number(process.env.PORT || 8000);

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  void connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl(port)}`);
  });
}