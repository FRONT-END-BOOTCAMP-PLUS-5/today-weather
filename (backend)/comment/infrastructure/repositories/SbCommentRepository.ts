import { SupabaseClient } from '@supabase/supabase-js';
import Comment, { CommentWithUser, RawCommentWithUser } from '../../domain/entities/Comment';
import ICommentRepository from '../../domain/repositories/ICommentRepository';
import { CommentMapper } from '../mapper/CommentMapper';

class SbCommentRepository implements ICommentRepository {
  constructor(private readonly supabase: SupabaseClient) {}
  async create(comment: Omit<Comment, 'id' | 'date_created'>): Promise<Comment> {
    const { data, error } = await this.supabase.from('comment').insert([comment]).select().single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to create comment: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from insert operation');
    }

    return data;
  }
  async getCommentByPostId(postId: number, myUserId: number): Promise<CommentWithUser[]> {
    const { data, error } = await this.supabase
      .from('comment')
      .select('*, user:user_id(id, name, profile_img)')
      .eq('post_id', postId)
      .order('date_created', { ascending: true });

    if (error) throw new Error(error.message);

    const flat: CommentWithUser[] = (data ?? []).map((c: RawCommentWithUser) =>
      CommentMapper.toDomain(c, myUserId),
    );

    const map = new Map<number, CommentWithUser>();
    flat.forEach((c) => map.set(c.id, c));
    const roots: CommentWithUser[] = [];
    flat.forEach((c) => {
      if (c.parent_id === null) {
        roots.push(c);
      } else {
        const parent = map.get(c.parent_id);
        if (parent) {
          if (!parent.replies) parent.replies = [];
          parent.replies.push(c);
        }
        // 대댓글에는 replies 필드를 추가하지 않음
      }
    });
    return roots;
  }
}
export default SbCommentRepository;
