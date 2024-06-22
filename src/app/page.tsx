
import Header from "@/components/header";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();


  return ( 
    <section>
      <Header/>
      <div>Hello {user?.firstName}</div> 
    </section>
  )
}
