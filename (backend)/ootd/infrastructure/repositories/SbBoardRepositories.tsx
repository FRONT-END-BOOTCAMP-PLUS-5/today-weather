import { SupabaseClient } from '@supabase/supabase-js';
import Board from '../../domain/entities/Board';
import IBoardRepository from '../../domain/repositories/IBoradRepository';

class SbBoardRepository implements IBoardRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAll(): Promise<Board[]> {
    const { data, error } = await this.supabase.from('post').select('*');
    if (error) throw error;
    return data;
  }

  async getById(id: string): Promise<Board | null> {
    const { data, error } = await this.supabase.from('post').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(board: Omit<Board, 'id' | 'date_created'>): Promise<Board> {
    console.log('Creating board with data:', board);

    const { data, error } = await this.supabase.from('post').insert([board]).select().single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to create board: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from insert operation');
    }

    console.log('Successfully created board:', data);
    return data;
  }

  async update(id: string, updateData: Partial<Board>): Promise<void> {
    const { error } = await this.supabase.from('post').update(updateData).eq('id', id);
    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('post').delete().eq('id', id);
    if (error) throw error;
  }
}

export default SbBoardRepository;
