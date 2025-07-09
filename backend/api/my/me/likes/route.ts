import { supabase } from '@/utils/supabase/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: 인증된 유저 ID로 대체 필요
  const userId = 1;
  const { data, error } = await supabase
    .from('likes')
    .select('post_id, posts(*)')
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, likes: data });
}
