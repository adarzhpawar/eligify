'use client'

import React, { useCallback, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function SchemeSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const currentSort = searchParams.get('sort') || 'relevance'

  const handleSortChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'relevance') {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }
    params.delete('page')
    
    startTransition(() => {
      router.push(pathname + '?' + params.toString())
    })
  }, [pathname, searchParams, router])

  return (
    <div className="flex items-center gap-3 relative">
      <label className="text-[14px] text-muted-foreground whitespace-nowrap">Sort by:</label>
      <div className="relative">
        <select 
          className="appearance-none h-10 pl-3 pr-8 rounded-lg border border-border bg-card text-foreground/90 text-[14px] hover:border-primary focus:border-primary outline-none transition-all duration-300 cursor-pointer min-w-[140px]"
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          disabled={isPending}
        >
          <option value="relevance">Relevance</option>
          <option value="match">Match Score</option>
          <option value="newest">Newest Added</option>
          <option value="closing-soon">Closing Soon</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-[18px]">expand_more</span>
      </div>
    </div>
  )
}
