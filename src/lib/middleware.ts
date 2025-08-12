import { NextResponse, type NextRequest } from 'next/server'

// Supabase removed. This middleware now acts as a no-op pass-through.
export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request })
}
