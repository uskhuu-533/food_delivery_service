"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
type form = {
  email: string;
  password: string;
};
const Login = () => {
    const router = useRouter()
  const [form, setFrom] = useState<form>({ email: "", password: "" });
  const [isEmailInvaild, setInvaild] = useState(false);
  const [showPass, setShow] = useState(false);


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFrom({...form, email:value})
  };
  const handlePasswordInput =(e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setFrom({...form, password:value})
  }
  const checkPassword = async () =>{
    try {
        const response = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
    
        const text = await response.text();
        console.log("Response status:", response.status);
        console.log("Response text:", text);
   if (response.ok) {
    localStorage.clear()
    localStorage.setItem("user", text)
    router.push('/home')
   }
      } catch (err) {
        console.error("Error posting user:", err);
      }
  }
  const jumpToHome = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(form.email)) {
        checkPassword()
    } else {
      setInvaild(true);
    }
  };
  return (
    <div className="w-[40%] flex items-center justify-center">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        <button
          // onClick={() => setStep(1)}
          className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center"
        >
          <ChevronLeft />
        </button>
        <div>
          <p className="font-bold text-2xl">Log in</p>
          <p className="text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="h-fit w-full flex flex-col gap-2">
            <input
              className={`h-9 pl-4 w-full border rounded-md`}
              placeholder="Enter your email address"
              onChange={(e) => handleChangeInput(e)}
              value={form.email}
              style={{
                borderColor: isEmailInvaild === true ? "red" : "#71717A",
              }}
            />
            {isEmailInvaild === true && (
              <label className="text-red-600 text-sm">
                Invalid email. Use a format like example@email.com
              </label>
            )}
          </div>
          <input
            type={showPass == true ? "text" : "password"}
            className="h-9 pl-4 w-full border rounded-md"
            placeholder="new-password"
              onChange={(e) =>handlePasswordInput(e)}
            value={form.password || ""}
            //   style={{
            //     borderColor: isPasswordError === "weak" ? "red" : "#71717A",
            //   }}
          />
          <div className="flex gap-2">
            <input type="checkbox" onClick={() => setShow((prev) => !prev)} />
            <p>Show password</p>
          </div>
        </form>
        <button
        onClick={jumpToHome}
        className="py-[4px] w-full border rounded-md"
      >
        let's go
      </button>
        <div className="flex w-full justify-center gap-4">
          <p>Don’t have an account?</p>
          <p onClick={()=>router.push('/')} className="text-[#2563EB]">Sign up</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
