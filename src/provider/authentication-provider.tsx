"use client";

import { getUserEmail } from "@/utils/request";
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
    const auth = async () => {
      try {
        const response = await getUserEmail();
        if (response?.status !== 200) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    auth();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>...loading</div>;
  }

  return children;
};
