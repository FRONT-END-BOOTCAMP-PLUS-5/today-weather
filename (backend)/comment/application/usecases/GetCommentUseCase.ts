import SbCommentRepository from '../../infrastructure/repositories/SbCommentRepository';
import { CommentWithUser } from '../../domain/entities/Comment'; // DTO 타입 import!

class GetCommentUseCase {
  private commentRepository: SbCommentRepository;

  constructor(commentRepository: SbCommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(postId: number, myUserId: number): Promise<CommentWithUser[]> {
    try {
      const comments = await this.commentRepository.getCommentByPostId(postId, myUserId);
      return comments;
    } catch (err) {
      console.error('Error fetching comments:', err);
      throw err;
    }
  }
}

export default GetCommentUseCase;
