import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { Post, Project, HotlistItem, WorkHistory } from '@/types'

export const notion = new Client({ auth: process.env.NOTION_API_KEY })
export const n2m = new NotionToMarkdown({ notionClient: notion })

// ─── Helpers ─────────────────────────────────────────────────

function text(prop: any): string {
  return prop?.rich_text?.map((t: any) => t.plain_text).join('') ?? ''
}

function title(prop: any): string {
  return prop?.title?.map((t: any) => t.plain_text).join('') ?? ''
}

function select(prop: any): string {
  return prop?.select?.name ?? ''
}

function checkbox(prop: any): boolean {
  return prop?.checkbox ?? false
}

function date(prop: any): string {
  return prop?.date?.start ?? ''
}

function url(prop: any): string {
  return prop?.url ?? ''
}

// ─── Writing ─────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_WRITING_DB!,
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Published', direction: 'descending' }],
  })

  return res.results.map((page: any) => ({
    id: page.id,
    title: title(page.properties.Title),
    slug: text(page.properties.Slug),
    summary: text(page.properties.Summary),
    date: date(page.properties.Published),
    published: select(page.properties.Status) === 'Published',
  }))
}

export async function getPost(slug: string): Promise<Post | null> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_WRITING_DB!,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  })

  if (!res.results.length) return null

  const page: any = res.results[0]
  return {
    id: page.id,
    title: title(page.properties.Title),
    slug: text(page.properties.Slug),
    summary: text(page.properties.Summary),
    date: date(page.properties.Published),
    published: select(page.properties.Status) === 'Published',
  }
}

export async function getPostContent(pageId: string): Promise<string> {
  const mdBlocks = await n2m.pageToMarkdown(pageId)
  return n2m.toMarkdownString(mdBlocks).parent
}

// ─── Projects ────────────────────────────────────────────────

export async function getProjects(featuredOnly = false): Promise<Project[]> {
  const filter: any = featuredOnly
    ? { property: 'Featured', checkbox: { equals: true } }
    : undefined

  const res = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB!,
    ...(filter && { filter }),
    sorts: [{ property: 'Name', direction: 'ascending' }],
  })

  return res.results.map((page: any) => ({
    id: page.id,
    name: title(page.properties.Name),
    description: text(page.properties.Description),
    url: url(page.properties.URL),
    tag: select(page.properties.Tag),
    status: select(page.properties.Status),
    featured: checkbox(page.properties.Featured),
  }))
}

// ─── Hotlist ─────────────────────────────────────────────────

export async function getHotlist(category?: string): Promise<HotlistItem[]> {
  const filter: any = category
    ? { property: 'Category', select: { equals: category } }
    : undefined

  const res = await notion.databases.query({
    database_id: process.env.NOTION_HOTLIST_DB!,
    ...(filter && { filter }),
    sorts: [{ property: 'Title', direction: 'ascending' }],
  })

  return res.results.map((page: any) => ({
    id: page.id,
    title: title(page.properties.Title),
    meta: text(page.properties.Meta),
    note: text(page.properties.Note),
    tag: select(page.properties.Tag),
    category: select(page.properties.Category) as HotlistItem['category'],
  }))
}

// ─── Work History ────────────────────────────────────────────

export async function getWorkHistory(): Promise<WorkHistory[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_WORK_HISTORY_DB!,
    sorts: [{ property: 'Start', direction: 'descending' }],
  })

  return res.results.map((page: any) => ({
    id: page.id,
    company: title(page.properties.Company),
    role: text(page.properties.Role),
    start: date(page.properties.Start),
    end: date(page.properties.End) || null,
    current: checkbox(page.properties.Current),
    description: text(page.properties.Description),
  }))
}
