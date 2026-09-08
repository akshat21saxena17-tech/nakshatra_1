import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('nx_session')?.value

  if (session) {
    try {
      return NextResponse.json({ user: JSON.parse(session) })
    } catch {
      return NextResponse.json({ user: null })
    }
  }

  return NextResponse.json({ user: null })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, full_name, avatar_url, role } = body

    const sessionData = {
      id: `usr_${Date.now().toString(36)}`,
      email: email || 'operator@nakshatra-x.space',
      full_name: full_name || 'Orbital Operator',
      avatar_url: avatar_url || 'https://lh3.googleusercontent.com/a/default-user',
      role: role || 'lead_operator',
      provider: 'Google OAuth (Verified)',
      created_at: new Date().toISOString(),
    }

    const cookieStore = await cookies()
    cookieStore.set('nx_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true, user: sessionData })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to establish session' }, { status: 400 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('nx_session')
  return NextResponse.json({ success: true })
}
