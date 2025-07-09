import { SupabaseClient } from '@supabase/supabase-js';
import Board from '../../domain/entities/Borad';
import IBoardRepository from '../../domain/repositories/IBoradRepository';

class SbBoardRepository implements IBoardRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAll(): Promise<Board[]> {
    const { data, error } = await this.supabase.from('boards').select('*');
    if (error) throw error;
    return data;
  }

  async getById(id: string): Promise<Board | null> {
    const { data, error } = await this.supabase.from('boards').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(board: Omit<Board, 'id' | 'date_created'>): Promise<Board> {
    const { data, error } = await this.supabase.from('boards').insert(board).select().single();

    if (error) throw error;
    return data;
  }

  async update(id: string, updateData: Partial<Board>): Promise<void> {
    const { error } = await this.supabase.from('boards').update(updateData).eq('id', id);
    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('boards').delete().eq('id', id);
    if (error) throw error;
  }
}

export default SbBoardRepository;
