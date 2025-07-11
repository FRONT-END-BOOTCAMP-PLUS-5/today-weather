import Comment, { CommentWithUser } from '../entities/Comment';

interface ICommentRepository {
  create(comment: Omit<Comment, 'id' | 'date_created'>): Promise<Comment>;
  getCommentByPostId(postId: number, myUserId: number): Promise<CommentWithUser[]>;
  deleteById(commentId: number, userId: number): Promise<boolean>;
}

export default ICommentRepository;
