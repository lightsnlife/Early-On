import { Database } from '@nozbe/watermelondb';
// DEV: LokiJS adapter — works with Expo Go, no native build required.
// PRODUCTION: swap back to SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import schema from './schema';
import Profile from './models/Profile';

const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: false,
});

export const database = new Database({
  adapter,
  modelClasses: [Profile],
});
