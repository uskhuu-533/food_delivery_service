"use client";
import {  useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  postNewUser } from "@/utils/request";
import { useRouter } from "next/navigation";
import { RegistrationEmailInput } from "../_components/Email";
import { RegistrationPasswordInput } from "../_components/Password";
import OTP from "../_components/EmailVerification";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "Invalid email. Use a format like example@email.com" }),
    password: z
      .string()
      .min(8, { message: "password min lenght 8" })
      .min(1, { message: "password is required" }),
    confirm: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
const RegistrationForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  const [step, setStep] = useState<number>(1);
  const goLoginPage = () => {
    router.push("/login");
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await postNewUser({
      email: values.email,
      password: values.password,
    });
    if (data?.status === 200) {
      setStep(3);
    }
  };


  return (
    <div className="w-[40%] flex items-center justify-center">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <RegistrationEmailInput setStep={setStep} form={form} />
            )}{" "}
            {step === 2 && (
              <RegistrationPasswordInput setStep={setStep} form={form} />
            )}
          </form>
        </FormProvider>
        {step === 3 && (
              <OTP email={form.watch("email")} />
            )}
        <div className="flex w-full justify-center gap-4">
          <p>Already have an account?</p>
          <p onClick={goLoginPage} className="text-[#2563EB] cursor-pointer">
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegistrationForm;
