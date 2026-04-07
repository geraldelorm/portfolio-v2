export interface Post {
  id: string
  title: string
  slug: string
  summary: string
  date: string
  published: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
  tag: string
  status: string
  featured: boolean
}

export interface HotlistItem {
  id: string
  title: string
  meta: string
  note: string
  tag: string
  category: 'Books' | 'TV' | 'Movies' | 'YouTube' | 'Games'
}

export interface WorkHistory {
  id: string
  company: string
  role: string
  start: string
  end: string | null
  current: boolean
  description: string
}
