import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function GET() {
  const token = cookies().get('auth_token');

  if (token) {
    return NextResponse.json({ data: { isAuthenticated: true } });
  }
  return NextResponse.json({ data: { isAuthenticated: false } });
}
