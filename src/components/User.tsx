'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/provider/User-Provider"
  

const UserDetail = () => {
     const router = useRouter()
     const {user} = useUser()
    const signOut =() =>{
        localStorage.clear()
        router.push('login')
    }
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full flex items-center w-11 h-full border-none justify-center bg-[#EF4444]"><User size={16} stroke="#FFFFFF"/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[188px] p-4 gap-2">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={"bottom"} className="flex justify-center">
            <Button className="rounded-full" onClick={signOut}>Sign out</Button>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
export default UserDetail