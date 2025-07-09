import SbBoardRepository from '../../infrastructure/repositories/SbBoardRepositories';
import Board from '../../domain/entities/Borad';

class CreateUseCase {
  private boardRepository: SbBoardRepository;

  constructor(boardRepository: SbBoardRepository) {
    this.boardRepository = boardRepository;
  }

  async execute(board: Omit<Board, 'id' | 'date_created'>): Promise<void> {
    try {
      await this.boardRepository.create(board);
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  }
}

export default CreateUseCase;
