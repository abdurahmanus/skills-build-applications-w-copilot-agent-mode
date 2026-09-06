import { pathToFileURL } from 'node:url';
import app from './app.js';
import { connectDatabase } from './config/database.js';

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:8000`;
}

export function startServer(port = Number(process.env.PORT || 8000)) {
  void connectDatabase();

  return app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  startServer();
}
