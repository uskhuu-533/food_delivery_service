import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Email from "./Email";
import Password from "./Password";
import axios from "axios";
import { AxiosError } from 'axios';
type User = {
  email: string;
  password: string;
};
const SignUP = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [newUser, setUser] = useState<User>({ email: "", password:"" });
  const [error, setError] = useState<unknown>()
  const goLoginPage = () => {
    router.push("/login");
  };

  console.log(newUser);



  // In your component:
  const postUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", newUser);
      console.log(response);
      router.push('/login')
    } catch (err) {
      console.error("Error posting user:", err);
      const error = err as AxiosError;
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(undefined);
      }
    }
  };

  

  return (
    <div className="w-[40%] flex items-center dark:text-white justify-center">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        {step === 1 ? (
          <Email user={newUser} setUser={setUser} setStep={setStep} />
        ) : (
          <Password
            user={newUser}
            setUser={setUser}
            setStep={setStep}
            postUser={postUser}
          />
        )}
        <div className="flex w-full justify-center gap-4">
          <p>Already have an account?</p>
          <p onClick={goLoginPage} className="text-[#2563EB]">
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUP;
