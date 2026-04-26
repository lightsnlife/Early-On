import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Profile extends Model {
  static table = 'profiles';

  @field('supabase_id') supabaseId!: string;
  @field('email') email!: string;
  @field('full_name') fullName!: string;
  @field('avatar_url') avatarUrl!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
