import { supabase } from '@/utils/supabase/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  // "user" 테이블 전체 조회
  const { data, error } = await supabase.from('user').select('*').limit(10);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, users: data });
}
