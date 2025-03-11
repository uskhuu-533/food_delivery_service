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
import React, { useEffect, useState } from "react"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserEmail } from "@/utils/request"
  

const UserDetail = () => {
    const [email, setEmail] = useState('')
     const router = useRouter()
    useEffect(()=>{
        const getEmail = async () =>{
            const token = localStorage.getItem('user')
            if (!token) {
                router.push('/login')
            }
            try {
                const response = await getUserEmail()
                
                setEmail(response?.data)
                if (response!.status !== 200) {
                    router.push('/login')
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getEmail()
    },[])
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
          <DropdownMenuLabel>{email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={"bottom"} className="flex justify-center">
            <Button className="rounded-full" onClick={signOut}>Sign out</Button>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
export default UserDetail