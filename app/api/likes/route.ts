// app/api/likes/route.ts (새로 생성)
import { NextResponse } from 'next/server';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';
import { SbLikesRepository } from '@/(backend)/likes/infrastructure/repositories/SbLikesRepository';
import { PostLikesUseCase } from '@/(backend)/likes/application/usecases/PostLikesUsecase';

export async function POST(req: Request) {
  try {
    // 사용자 인증 확인
    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json(
        { success: false, message: 'postId가 필요합니다.' },
        { status: 400 },
      );
    }

    const likesRepository = new SbLikesRepository();
    const postLikesUseCase = new PostLikesUseCase(likesRepository);

    const result = await postLikesUseCase.execute(user.id, postId);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '좋아요 처리 중 오류가 발생했습니다.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

//좋아요 개수 조회
export async function GET(req: Request) {
  try {
    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { success: false, message: 'postId가 필요합니다.' },
        { status: 400 },
      );
    }

    const likesRepository = new SbLikesRepository();
    const isLiked = await likesRepository.checkLikeExists(user.id, parseInt(postId));
    const likeCount = await likesRepository.getLikeCount(parseInt(postId));

    return NextResponse.json({
      success: true,
      isLiked,
      likeCount,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '좋아요 상태 조회 중 오류가 발생했습니다.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
