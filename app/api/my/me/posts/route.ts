import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';

// 사용자가 작성한 포스트 목록 조회
export async function GET() {
  const user = await getUserFromJWT();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { data: posts, error } = await supabase.from('post').select('*').eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, posts });
}
