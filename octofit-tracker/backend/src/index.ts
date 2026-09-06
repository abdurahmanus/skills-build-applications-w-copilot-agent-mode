export { getApiBaseUrl, startServer } from './server.js';

if (import.meta.url === new URL(process.argv[1] ?? '', 'file:').href) {
  import('./server.js').then(({ startServer }) => startServer());
}