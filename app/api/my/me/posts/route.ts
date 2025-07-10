import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';

export async function GET() {
  const dummyUserId = 1;
  const { data: posts, error } = await supabase.from('post').select('*').eq('user_id', dummyUserId);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, posts });
}
