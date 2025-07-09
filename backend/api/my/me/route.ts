import { supabase } from '@/utils/supabase/supabaseClient';
import { NextResponse } from 'next/server';

// 회원 정보 조회
export async function GET() {
  // TODO: 인증된 유저 정보로 대체 필요
  const { data, error } = await supabase.from('user').select('*').single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, user: data });
}

// 회원 정보 수정
export async function PUT(request: Request) {
  const body = await request.json();
  // TODO: 인증된 유저 정보로 대체 필요
  const { data, error } = await supabase.from('user').update(body).eq('id', body.id).single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, user: data });
}
