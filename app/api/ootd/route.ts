import CreateUseCase from '@/(backend)/ootd/application/usecases/CreateUseCase';
import GetPostUseCase from '@/(backend)/ootd/application/usecases/GetPostUseCase';
import SbBoardRepository from '@/(backend)/ootd/infrastructure/repositories/SbBoardRepositories';
import { supabase } from '@/utils/supabase/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import UpdateUseCase from '@/(backend)/ootd/application/usecases/UpdateUseCase';
import SeasonUseCase from '@/(backend)/ootd/application/usecases/SeasonUseCase';

/* 게시글 작성 */
export async function POST(req: NextRequest) {
  try {
    const supabaseClient = supabase;
    const repository = new SbBoardRepository(supabaseClient);
    const createUseCase = new CreateUseCase(repository);

    const body = await req.json();
    const { text, feels_like, user_id, img_url } = body;

    // img_url이 문자열이면 배열로 변환
    const imgUrls = img_url ? (Array.isArray(img_url) ? img_url : [img_url]) : [];

    const created = await createUseCase.execute(
      {
        text,
        feels_like,
        user_id,
      },
      imgUrls,
    );

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json({ message: '서버 에러', error: 'UNKNOWN_ERROR' }, { status: 500 });
  }
}

/* 게시글 조회 */
export async function GET(req: NextRequest) {
  try {
    const supabaseClient = supabase;
    const repository = new SbBoardRepository(supabaseClient);
    const getPostUseCase = new GetPostUseCase(repository);
    const seasonUseCase = new SeasonUseCase(repository);

    const { searchParams } = new URL(req.url);
    const season = searchParams.get('season');

    console.log('🔍 Season parameter:', season);

    let posts;

    // 빈 파라미터나 null 체크 강화
    if (season && season.trim() !== '' && season !== 'null' && season !== 'undefined') {
      // 계절별 필터
      const validSeasons = ['봄', '여름', '가을', '겨울'];
      if (!validSeasons.includes(season)) {
        return NextResponse.json(
          { message: '계절은 봄, 여름, 가을, 겨울 중 하나여야 합니다.' },
          { status: 400 },
        );
      }
      console.log('계절별 게시글 조회', season);
      posts = await seasonUseCase.getPostsBySeason(season);
    } else {
      // 전체 게시글
      console.log('전체 게시글 조회');
      posts = await getPostUseCase.getAllPosts();
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('게시글 조회 실패', error);
    return NextResponse.json(
      { message: '게시글 조회 실패', error: 'FETCH_ERROR' },
      { status: 500 },
    );
  }
}

/* 게시글 수정 */
export async function PUT(req: NextRequest) {
  try {
    const supabaseClient = supabase;
    const repository = new SbBoardRepository(supabaseClient);
    const updateUseCase = new UpdateUseCase(repository);

    const body = await req.json();
    const { id, text } = body;

    if (!id || typeof text !== 'string') {
      return NextResponse.json({ message: 'id와 text는 필수입니다.' }, { status: 400 });
    }

    await updateUseCase.execute(id, { text });

    return NextResponse.json({ message: '게시글이 수정되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating board:', error);
    return NextResponse.json(
      { message: '게시글 수정 실패', error: 'UPDATE_ERROR' },
      { status: 500 },
    );
  }
}
