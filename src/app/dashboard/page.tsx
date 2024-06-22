"use client";

import { useSession } from "@clerk/clerk-react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function Dashboard() {
  const { session } = useSession();
  const [ hasInserted, setHasInserted ] = useState(false);

  const createUser = useAction(api.users.createUser);

  const firstName = session?.user.firstName || "";
  const email = session?.user.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (session && !hasInserted) {
      createUser({
        email,
        firstName,
        connected: false,
        provider: null,
        accessToken: null,
        refreshToken: null,
      })
        .then(() => {
          setHasInserted(true);
        })
        .catch((error: any) => {
          console.error("Error inserting user: ", error);
        });
    }
  }, [session]);

  return (
    <section className="w-full flex flex-col justify-center">
      <HeaderDashboard />
      <h1>Hey, {firstName}!</h1>
    </section>
  );
}
