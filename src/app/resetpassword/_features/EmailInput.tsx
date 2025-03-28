import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const EmailInput = ({
  email,
  setEmail,
  setStep,
}: {
  email: string;
  setEmail: (email: string) => void;
  setStep: (step: number) => void;
}) => {
    const sendOneTimePassword = async (email: string) => {
        try {
          const response = await axios.post(
            `https://food-backend-8ud7.onrender.com/opt/change-pass`,
            { email: email }
          );
          if (response.status === 200) {
            setStep(2)
          }
        } catch (error) {
          console.log(error);
        }
      };
  const step2 = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      await sendOneTimePassword(email);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <p>Enter your email</p>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={step2}>let&apos;s go</Button>
    </div>
  );
};
export default EmailInput;
