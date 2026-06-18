'use server'

import { getAuthUser } from '@/lib/auth-cache'
import { getRecommendedSchemes as getRecommended } from '@/services/recommendation'

export async function getRecommendedSchemes() {
  const user = await getAuthUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const recommendations = await getRecommended(user.id)
    return { success: true, data: recommendations }
  } catch (err: unknown) {
    console.error('Error fetching recommendations:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Failed to fetch recommendations' }
  }
}

