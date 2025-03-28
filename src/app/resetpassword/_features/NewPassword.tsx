"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

const NewPassword = ({ email }: { email: string }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
    email : email
  });
  const chanegPassword = async () => {
    if (passwords.confirm === passwords.password) {
    try {
      const response = await axios.put(
        `https://food-backend-8ud7.onrender.com/users/password`,
        passwords
      );
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  }};
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
