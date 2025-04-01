"use client";

import LoaderAuth from "@/components/LoaderAuth";
import {  getUserEmail } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
type User = {
  email : string
  address : string
}
type UserContextType = {
  user: User | null
  openAddressDialog : boolean
  setOpenAddressDialog : (openAddressDialog:boolean) => void
  refetchUser : ()=>void
};
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const router = useRouter();
  const [openAddressDialog, setOpenAddressDialog] = useState(false)
 const {data : user = null , refetch : refetchUser, isLoading } = useQuery({
  queryKey : ["user"],
  queryFn : getUserEmail,
  staleTime: 1000 * 60 * 10,
 })
 const path = usePathname()
 useEffect(()=>{  
  if (!isLoading) {
    console.log(user);
    
  if (user) {
    if (path === "/category") return 
    router.push('/')
  }else{
    if (path === "/sign-up" || path === "/resetpassword") return
    router.push('/login')
  }}
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[isLoading])
 if (isLoading) {
  return (
    <LoaderAuth/>
  )
 }
  return (
    <UserContext.Provider value={{user, refetchUser, setOpenAddressDialog, openAddressDialog }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
