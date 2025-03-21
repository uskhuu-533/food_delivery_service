"use client";

import { getUserAddress, getUserEmail } from "@/utils/request";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  email: string;
  address: string | null;
  getAddress(): Promise<void>;
  getEmail(): Promise<void>;
  openAddressDialog : boolean
  setOpenAddressDialog : (openAddressDialog:boolean) => void
};
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const rouder = useRouter();
  const [openAddressDialog, setOpenAddressDialog] = useState(false)
  const [address, setAddress] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const getEmail = async () => {
    try {
      const response = await getUserEmail();
      if (typeof response === "string") {
        setEmail(response);
      }else{
        rouder.push("/login")
      }
    } catch (error) {
      console.log(error);
      rouder.push("/login");
    }
  };
  const getAddress = async () => {
    const response = await getUserAddress();
    if (typeof response === "string") {
      setAddress(response);
    }
  };
  useEffect(() => {
    getEmail();
    getAddress();
  }, []);
  return (
    <UserContext.Provider value={{ email, address, getAddress, getEmail, setOpenAddressDialog, openAddressDialog }}>
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
