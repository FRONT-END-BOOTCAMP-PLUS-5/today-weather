import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  // Create a dummy user payload
  const payload = {
    id: 1,
    name: 'Test User',
    profile_img: 'https://example.com/avatar.jpg',
  };

  // Sign the JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

  // Create response with cookie
  const response = NextResponse.json({ ok: true, message: 'Cookie set!' });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
