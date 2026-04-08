import type { RaceSchedule } from '@/types'

export async function getNextRace(): Promise<RaceSchedule | null> {
  try {
    const res = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json', {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null

    const data = await res.json()
    const races: any[] = data?.MRData?.RaceTable?.Races ?? []

    if (races.length === 0) return null

    const race = races[0]

    return {
      round: race.round,
      raceName: race.raceName,
      circuitName: race.Circuit?.circuitName ?? '',
      country: race.Circuit?.Location?.country ?? '',
      date: race.date,
      time: race.time ?? '',
    }
  } catch {
    return null
  }
}
