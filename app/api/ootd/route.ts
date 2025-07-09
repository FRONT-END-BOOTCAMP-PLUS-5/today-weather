import CreateUseCase from '@/(backend)/ootd/application/usecases/CreateUseCase';
import SbBoardRepository from '@/(backend)/ootd/infrastructure/repositories/SbBoardRepositories';
import { supabase } from '@/utils/supabase/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabaseClient = supabase;
    const repository = new SbBoardRepository(supabaseClient);
    const createUseCase = new CreateUseCase(repository);

    const body = await req.json();
    const { text, feels_like, user_id, season } = body;

    const created = await createUseCase.execute({
      text,
      feels_like,
      user_id,
      season,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, error: 'CREATE_BOARD_ERROR' },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: '서버 에러', error: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}
