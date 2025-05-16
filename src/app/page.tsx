import { Button } from "@heroui/button";
import Link from "next/link";
import {FaRegSmile} from "react-icons/fa"

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-2xl flex justify-center items-center bg-red-700 w-full p-4 text-white">
      Hello app!
    </h1>
    <Button 
         as={Link}
         href='/members'
         color='primary' 
         variant='bordered'  
         startContent={<FaRegSmile size={20} />}>Click me</Button>
    </div>
  );
}