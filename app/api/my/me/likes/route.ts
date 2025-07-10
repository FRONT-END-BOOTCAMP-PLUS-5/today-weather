import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';

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

  const { data: posts, error: postsError } = await supabase
    .from('post')
    .select('*')
    .in(
      'id',
      likes.map((like) => like.post_id),
    );

  if (postsError) {
    return NextResponse.json({ ok: false, error: postsError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, posts });
}
