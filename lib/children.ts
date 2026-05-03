import { supabase } from './supabase';
import { childColors } from '@/constants/colors';

export interface Child {
  id: string;
  fName: string;
  lName: string;
  DoB: Date;
  parent1: string;
  order: number;
  isActive: boolean;
  color: number;
}

export async function fetchChildren(userId: string): Promise<Child[]> {
  const { data, error } = await supabase
    .from('children')
    .select('id, fName, lName, DoB, order, isActive, color')
    .eq('parent1', userId)
    .order('order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Child[];
}

export async function addChild(
  fName: string,
  lName: string,
  DoB: Date,
  parent1: string,
): Promise<void> {
  const { count, error: countError } = await supabase
    .from('children')
    .select('*', { count: 'exact', head: true })
    .eq('parent1', parent1)
    .eq('isActive', true);
  if (countError) throw countError;

  const { error } = await supabase
    .from('children')
    .insert({
      fName, lName, DoB, parent1,
      order: (count ?? 0) + 1,
      isActive: true,
      color: (count ?? 0) % childColors.length,
    });
  if (error) throw error;
}
