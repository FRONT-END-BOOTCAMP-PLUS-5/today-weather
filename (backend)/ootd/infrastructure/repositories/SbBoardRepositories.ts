import { SupabaseClient } from '@supabase/supabase-js';
import Board from '../../domain/entities/Board';
import IBoardRepository from '../../domain/repositories/IBoradRepository';

class SbBoardRepository implements IBoardRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  // 게시글 조회
  async getAll(): Promise<Board[]> {
    const { data, error } = await this.supabase.from('post').select(`*, photos:photo(img_url)`);
    if (error) throw error;
    return data;
  }

  // 게시글 상세 조회
  async getById(id: string): Promise<Board | null> {
    const { data, error } = await this.supabase
      .from('post')
      .select(`*, photos:photo(img_url)`)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  // 게시글 생성
  async create(board: Omit<Board, 'id' | 'date_created'>, img_url?: string[]): Promise<Board> {
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

    // 3. 생성된 게시글과 이미지를 함께 조회
    const { data: fullData, error: fetchError } = await this.supabase
      .from('post')
      .select(`*, photos:photo(img_url)`)
      .eq('id', data.id)
      .single();
    if (fetchError) {
      console.error('Error fetching created board with photos:', fetchError);
      return data;
    }
    return fullData;
  }

  //게시글 수정(글 내용만 수정)
  async update(id: string, updateData: Partial<Board>): Promise<void> {
    if (!updateData.text) {
      throw new Error('text 필드만 수정할 수 있습니다.');
    }
    const { error } = await this.supabase
      .from('post')
      .update({ text: updateData.text })
      .eq('id', id);
    if (error) throw error;
    // 변경 사항 출력
    const { data: updated, error: selectError } = await this.supabase
      .from('post')
      .select('*')
      .eq('id', id)
      .single();
    if (selectError) {
      console.error('수정된 게시글 조회 실패:', selectError);
    } else {
      console.log('수정된 게시글:', updated);
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('post').delete().eq('id', id);
    if (error) throw error;
  }

  // 계절별 게시글 조회
  async getBySeason(season: string): Promise<Board[]> {
    const { data, error } = await this.supabase.from('post').select(`*, photos:photo(img_url)`);
    if (error) throw error;

    // 생성 날짜 기준으로 계절 필터링
    return data.filter((post) => {
      const createdDate = new Date(post.date_created);
      const createdMonth = createdDate.getMonth() + 1; // 0-based to 1-based

      // 월별로 계절 자동 계산
      let postSeason: string;
      if (createdMonth >= 3 && createdMonth <= 5) {
        postSeason = '봄';
      } else if (createdMonth >= 6 && createdMonth <= 8) {
        postSeason = '여름';
      } else if (createdMonth >= 9 && createdMonth <= 11) {
        postSeason = '가을';
      } else {
        postSeason = '겨울';
      }

      // 요청한 계절과 일치하는지 확인
      return postSeason === season;
    });
  }
}

export default SbBoardRepository;
