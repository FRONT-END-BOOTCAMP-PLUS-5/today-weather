import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';

export async function GET() {
  const dummyUserId = 1;
  const { data: user, error: userError } = await supabase
    .from('user')
    .select('id')
    .eq('id', dummyUserId)
    .single();

  if (userError || !user) {
    return NextResponse.json(
      { ok: false, error: userError?.message || 'User not found' },
      { status: 404 },
    );
  }

  const { data: likes, error: likesError } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', dummyUserId);

  if (likesError) {
    return NextResponse.json({ ok: false, error: likesError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, likes });
}
