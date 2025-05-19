import { Button } from "@heroui/button";
import Link from "next/link";

import {auth} from '@/auth'
import LogoutButton from './auth/logout/LogoutButton'

export default async function Home() {
  const session = await auth()
  
  return (
    <div>
      <h1>
      Hello app!
    </h1>
    <h3 className="text-2xl font-semibold">User session data</h3>
    {
      session ? (
         <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            Bienvenue {session.user?.email}
            <br />
            <LogoutButton/>
            
         </div>
      ):(
      <div>Not signed in</div>
    )
    }
    
    </div>
  );
}