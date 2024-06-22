"use client";

import { SignedOut } from "@clerk/clerk-react";
import { SignInButton, SignedIn, UserButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { Menu } from "./menu";

export default function Header() {
  const { isSignedIn } = useSession();

  return (
    <header className="w-full border-b border-slate-200 py-3 px-10 flex items-center justify-between">
      <Link href="/" className="font-bold">
        KeepInboxTidy
      </Link>
        <div>
            <Menu />
        </div>

      {isSignedIn ? (
        <SignedIn>
          <div className="flex items-center gap-7">
            <Link
              className="bg-purple-500 hover:bg-purple-600 transition-all text-white py-1 rounded-md border border-purple-600 px-3 text-[13px] font-semibold"
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
