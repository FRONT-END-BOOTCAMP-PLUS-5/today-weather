import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';

// 사용자가 좋아요한 포스트 목록 조회
export async function GET() {
  const user = await getUserFromJWT();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { data: userData, error: userError } = await supabase
    .from('user')
    .select('id')
    .eq('id', user.id)
    .single();

  if (userError || !userData) {
    return NextResponse.json(
      { ok: false, error: userError?.message || 'User not found' },
      { status: 404 },
    );
  }

  const { data: likes, error: likesError } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', userData.id);

  if (likesError) {
    return NextResponse.json({ ok: false, error: likesError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, likes });
}
