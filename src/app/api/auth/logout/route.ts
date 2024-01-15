// pages/api/auth/logout.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function POST() {
  cookies().delete('auth_token');

  return NextResponse.json(
    { message: 'Logged out successfully' },
    {
      status: 200,
    }
  );
}
