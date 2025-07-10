import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';

// 회원 정보 조회
export async function GET() {
  // 테스트용 userId (DB에 반드시 존재하는 값으로!)
  const dummyUserId = 1;
  const { data, error } = await supabase.from('user').select('*').eq('id', dummyUserId).single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, user: data });
}

// 회원 정보 수정
export async function PATCH(request: Request) {
  const dummyUserId = 1;
  const body = await request.json();
  // name, profile_img는 not null이므로 항상 값이 있다고 가정
  const updateFields = {
    name: body.name,
    profile_img: body.profile_img,
  };
  const { data, error } = await supabase
    .from('user')
    .update(updateFields)
    .eq('id', dummyUserId)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to update user' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, user: data });
}
