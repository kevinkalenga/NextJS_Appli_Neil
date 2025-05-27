'use client'

import LogoutButton from '../app/auth/logout/LogoutButton'

export default function SessionClient({ session }: { session: any }) {
  if (!session) return <div>Not signed in</div>

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      Bienvenue {session.user?.email}
      <br />
      <LogoutButton />
    </div>
  )
}
