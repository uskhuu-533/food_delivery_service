"use client";


import { getUserEmail } from "@/utils/request";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type props = {
  setStep: (_step: number) => void;
  setUser: (_user: User) => void;
  user: User;
};
type User = {
  email: string;
  password: string;
};

const Email = ({ setStep, setUser, user }: props) => {
  const [isEmailInvaild, setInvaild] = useState(false);
  const router = useRouter();

  const jumpToPassword = () => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if (regex.test(user.email)) {
      setStep(2);
    } else {
      setInvaild(true);
    }
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInvaild(false);
    setUser({ ...user, email: value });
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const response = await getUserEmail()
        if (response?.statusText == "OK") {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmail();
  }, []);

  return (
    <>
      <button className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
        <ChevronLeft />
      </button>
      <div>
        <p className="font-bold text-2xl">Create your account</p>
        <p className="text-[#71717A]">
          Sign up to explore your favorite dishes
        </p>
      </div>
      <div className="h-fit w-full flex flex-col gap-2">
        <input
          className={`h-9 pl-4 w-full border rounded-md`}
          placeholder="Enter your email address"
          onChange={(e) => handleChangeInput(e)}
          value={user.email}
          style={{ borderColor: isEmailInvaild === true ? "red" : "#71717A" }}
        />
        {isEmailInvaild === true && (
          <label className="text-red-600 text-sm">
            Invalid email. Use a format like example@email.com
          </label>
        )}
      </div>
      <button
        onClick={jumpToPassword}
        className="py-[4px] w-full border rounded-md"
      >
        let's go
      </button>
    </>
  );
};
export default Email;
