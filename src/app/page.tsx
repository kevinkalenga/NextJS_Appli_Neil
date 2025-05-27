import { auth } from '@/auth'
import SessionClient from '@/components/SessionClient'

export default async function Home() {
  const session = await auth()

  return (
    <div>
      <h1>Hello app!</h1>
      <h3 className="text-2xl font-semibold">User session data</h3>
      <SessionClient session={session} />
    </div>
  )
}
