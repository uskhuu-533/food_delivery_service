"use client";

import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NewPassword = ({ email }: { email: string }) => {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
    email: email,
  });
  const chanegPassword = async () => {
    if (passwords.confirm === passwords.password) {
      try {
        const response = await axios.put(
          `https://food-backend-8ud7.onrender.com/users/password`,
          passwords
        );
        if (response.status === 200) {
          toast(
            <div className="flex text-xl text-[#EF4444] pl-10 items-center gap-5 justify-center">
              <Logo />
              <p>Password changed</p>
            </div>,
            {
              description: "",
              position: "top-center",
            }
          );
          router.push('/login')
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <p>Create new password</p>
      <form>
        <label htmlFor="new password">
          new password
          <Input
            value={passwords.password}
            onChange={(e) =>
              setPasswords({ ...passwords, password: e.target.value })
            }
          />
        </label>
        <label>
          confirm password
          <Input
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </label>
      </form>
      <Button onClick={chanegPassword}>Save changes</Button>
    </div>
  );
};
export default NewPassword;
