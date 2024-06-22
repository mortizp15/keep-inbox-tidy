"use client"

import { SignInButton, UserButton, useSession } from "@clerk/clerk-react";
import Link from "next/link";
import { Menu } from "./menu";
import { SignedIn } from "@clerk/nextjs";

export default function HeaderDashboard() {
const { isSignedIn } = useSession();

  return (
    <header className="w-full border-b border-slate-200 py-3 px-10 flex items-center justify-between">
      <Link href="/" className="font-bold">
        KeepInboxTidy
      </Link>
        <div className="font-medium flex gap-10">
            <Link href="/" className="py-1 px-3 rounded-md border-2 border-transparent hover:text-purple-700 transition">Home</Link>
            <Link href="/pricing" className="py-1 px-3 rounded-md border-2 border-transparent hover:text-purple-700 transition">Pricing</Link>
            <Link href="/docs" className="py-1 px-3 rounded-md border-2 border-transparent hover:text-purple-700 transition">Docs</Link>
        </div>

      {isSignedIn ? (
        <SignedIn>
          <div className="flex items-center gap-7">
            <Link
              className="bg-purple-500 hover:bg-purple-600 transition-all text-white py-1 rounded-md border border-purple-300 px-3 text-[13px] font-semibold"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      ) : (
        <SignInButton />
      )}
    </header>
  );
}