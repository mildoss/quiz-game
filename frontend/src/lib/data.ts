import pool from '@/lib/db';
import { cache } from 'react';
import {UserStats} from "@/types/user";

export const getUserStatsById = cache(async (userId: number) => {
  try {
    const {rows} = await pool.query<UserStats>(
      'SELECT * FROM users_info WHERE user_id = $1',
      [userId]
    );
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return [];
  }
});