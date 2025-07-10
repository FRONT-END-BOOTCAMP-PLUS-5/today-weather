import CreateUseCase from '@/(backend)/ootd/application/usecases/CreateUseCase';
import GetPostUseCase from '@/(backend)/ootd/application/usecases/GetPostUseCase';
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
    return NextResponse.json({ message: '서버 에러', error: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabaseClient = supabase;
    const repository = new SbBoardRepository(supabaseClient);
    const getPostUseCase = new GetPostUseCase(repository);

    const posts = await getPostUseCase.getAllPosts();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { message: '게시글 조회 실패', error: 'FETCH_ERROR' },
      { status: 500 },
    );
  }
}
