import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import Profile from './models/Profile';

const adapter = new SQLiteAdapter({
  schema,
  // jsi: true enables JSI for the new React Native architecture
  jsi: true,
  onSetUpError: (error: Error) => {
    console.error('[WatermelonDB] Setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Profile],
});
