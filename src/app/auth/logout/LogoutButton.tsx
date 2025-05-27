'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@nextui-org/react'
import {FaRegSmile} from "react-icons/fa"

export default function LogoutButton() {
  
  
   const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }
  
  
  
  return (
    <Button
       onPress={handleLogout}
          // onClick={() => signOut()}
         className='mt-3'
         type="submit"
         color='primary' 
         variant='bordered'
         startContent={<FaRegSmile size={20} />}  
         >
      Logout
    </Button>
  )
}

