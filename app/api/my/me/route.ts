import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/supabaseClient';
import { getUserFromJWT } from '@/utils/auth/tokenAuth';

export async function GET() {
  const user = await getUserFromJWT();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { data, error } = await supabase.from('user').select('*').eq('id', user.id).single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, user: data });
}

export async function PATCH(request: Request) {
  const user = await getUserFromJWT();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const updateFields = {
    name: body.name,
    profile_img: body.profile_img,
  };
  const { data, error } = await supabase
    .from('user')
    .update(updateFields)
    .eq('id', user.id)
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
