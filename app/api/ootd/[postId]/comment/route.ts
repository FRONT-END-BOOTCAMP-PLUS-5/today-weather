import { supabase } from '@/utils/supabase/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import SbCommentRepository from '@/(backend)/comment/infrastructure/repositories/SbCommentRepository';
import GetCommentUseCase from '@/(backend)/comment/application/usecases/GetCommentUseCase';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';

// 게시글 댓글 조회 API
export async function GET(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseClient = supabase;
    const repository = new SbCommentRepository(supabaseClient);
    const getCommentsByPostUseCase = new GetCommentUseCase(repository);

    // params를 await하여 postId 가져오기
    const resolvedParams = await params;
    const postId = Number(resolvedParams.postId);

    const comments = await getCommentsByPostUseCase.execute(postId, user.id);

    return NextResponse.json({ ok: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ message: '서버 에러', error: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}
