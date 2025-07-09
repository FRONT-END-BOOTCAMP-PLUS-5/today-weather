import Board from '../entities/Borad';

interface IBoardRepository {
  getAll(): Promise<Board[]>;
  getById(id: string): Promise<Board | null>;
  create(board: Omit<Board, 'id' | 'date_created'>): Promise<Board>;
  update(id: string, updateData: Partial<Board>): Promise<void>;
  delete(id: string): Promise<void>;
}

export default IBoardRepository;
