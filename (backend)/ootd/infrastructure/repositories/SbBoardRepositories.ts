import { SupabaseClient } from '@supabase/supabase-js';
import Board from '../../domain/entities/Board';
import IBoardRepository from '../../domain/repositories/IBoradRepository';

class SbBoardRepository implements IBoardRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAll(): Promise<Board[]> {
    const { data, error } = await this.supabase.from('post').select(`
        *,
        photos:photo(img_url)
      `);
    if (error) throw error;
    return data;
  }

  async getById(id: string): Promise<Board | null> {
    const { data, error } = await this.supabase
      .from('post')
      .select(
        `
        *,
        photos:photo(img_url)
      `,
      )
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(board: Omit<Board, 'id' | 'date_created'>, img_url?: string[]): Promise<Board> {
    // 1. 게시글 생성
    const { data, error } = await this.supabase.from('post').insert([board]).select().single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to create board: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from insert operation');
    }

    console.log('Successfully created board:', data);

    // 2. 이미지들 저장 (있는 경우)
    if (img_url && Array.isArray(img_url) && img_url.length > 0) {
      const photoData = img_url.map((imgUrl) => ({
        post_id: data.id,
        img_url: imgUrl,
      }));

      const { error: photoError } = await this.supabase.from('photo').insert(photoData);

      if (photoError) {
        console.error('Error saving photos:', photoError);
        throw new Error(`Failed to save photos: ${photoError.message}`);
      }

      console.log('Successfully saved photos for board:', data.id);
    }

    // 3. 생성된 게시글과 이미지를 함께 조회해서 반환
    const { data: fullData, error: fetchError } = await this.supabase
      .from('post')
      .select(
        `
        *,
        photos:photo(img_url)
      `,
      )
      .eq('id', data.id)
      .single();

    if (fetchError) {
      console.error('Error fetching created board with photos:', fetchError);
      return data; // 이미지 없이 반환
    }

    return fullData;
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
