import { supabase } from '@/utils/supabase/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import SbCommentRepository from '@/(backend)/comment/infrastructure/repositories/SbCommentRepository';
import GetCommentUseCase from '@/(backend)/comment/application/usecases/GetCommentUseCase';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseClient = supabase;
    const repository = new SbCommentRepository(supabaseClient);
    const getCommentsByPostUseCase = new GetCommentUseCase(repository);

    const postId = Number(params.postId);

    const comments = await getCommentsByPostUseCase.execute(postId, user.id);

    return NextResponse.json({ ok: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ message: '서버 에러', error: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}
