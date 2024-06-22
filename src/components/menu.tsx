"use client"

import Link from "next/link"

export function Menu() {
  return (
    <div className="font-medium flex gap-10">
      <Link href="/start" className="py-1 px-3 rounded-md border-2 border-transparent hover:text-purple-700 transition">Start</Link>
      <Link href="/pricing" className="py-1 px-3 rounded-md border-2 border-transparent hover:text-purple-700 transition">Pricing</Link>
      <Link href="/about" className="py-1 px-3 rounded-md border-2 border-transparent hover:text-purple-700 transition">About</Link>
    </div>
  )
}
