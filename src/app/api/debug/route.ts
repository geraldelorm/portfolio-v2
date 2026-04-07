import { NextResponse } from 'next/server'
import { getHotlist } from '@/lib/notion'

export async function GET() {
  try {
    const items = await getHotlist()
    return NextResponse.json({ ok: true, count: items.length, env: !!process.env.NOTION_API_KEY })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message, env: !!process.env.NOTION_API_KEY })
  }
}
