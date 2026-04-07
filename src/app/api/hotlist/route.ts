import { NextResponse } from 'next/server'
import { getHotlist } from '@/lib/notion'

export async function GET() {
  try {
    const items = await getHotlist()
    return NextResponse.json(items, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    })
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
