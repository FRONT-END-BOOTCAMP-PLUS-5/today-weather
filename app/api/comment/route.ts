import { supabase } from '@/utils/supabase/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import SbCommentRepository from '@/(backend)/comment/infrastructure/repositories/SbCommentRepository';
import PostCommentUseCase from '@/(backend)/comment/application/usecases/PostCommentUseCase';

export async function POST(req: NextRequest) {
  try {
    const supabaseClient = supabase;
    const repository = new SbCommentRepository(supabaseClient);
    const postCommentUseCase = new PostCommentUseCase(repository);

    const body = await req.json();
    const { text, user_id, post_id, parent_id } = body;

    // parent_id는 대댓글이면 값이, 아니면 null (undefined → null 처리)
    const createdComment = await postCommentUseCase.execute({
      text,
      user_id,
      post_id,
      parent_id: parent_id ?? null, // undefined면 null로 저장
    });

    return NextResponse.json(createdComment, { status: 201 });
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json({ message: '서버 에러', error: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}
