import { supabase } from './supabase';

export interface TopLevelMenuItem {
  id: string;
  name: string;
  color: string;
  iconEmoji: string;
  subText: string;
  displayOrder: number;
}

export async function fetchTopLevelMenu(): Promise<TopLevelMenuItem[]> {
  const { data, error } = await supabase
    .from('topLevelMenu')
    .select('id, name, color, iconEmoji, subText, displayOrder')
    .order('displayOrder', { ascending: true });
  if (error) throw error;
  return (data ?? []) as TopLevelMenuItem[];
}
