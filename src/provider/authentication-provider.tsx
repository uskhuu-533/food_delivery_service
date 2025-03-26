"use client";

import LoaderAuth from "@/components/LoaderAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
    }
 
    setLoading(false);
  }, [router]);

  if (loading) {
    return   <LoaderAuth/>
  }

  return children;
};
