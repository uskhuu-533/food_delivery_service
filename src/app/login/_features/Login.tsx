"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkPasswordLogin } from "@/utils/request";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email. Use a format like example@email.com" }),
  password: z
    .string()
    .min(8, { message: "password min lenght 8" })
    .min(1, { message: "password is required" }),
});
const Login = () => {
  const router = useRouter();

  const [showPass, setShow] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const checkPassword = async (values: z.infer<typeof formSchema>) => {
    const data = await checkPasswordLogin(values);
    console.log(data);
    
    if(data?.data === "User not found"){
      console.log(data.data);
      form.setError('email', {message:data.data})
    }else if (data?.status === 200 && data.data) {
      localStorage.setItem("user", data.data.token);
      Cookies.set("token", data.data.token, { expires: 7, path: "" });
      router.push("/");
    }else {
      form.setError('password', {message : "wrong password or email"})
    }
  };

  return (
    <div className="w-[40%] flex items-center justify-center gap-6">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        <button className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
          <ChevronLeft stroke="#18181B"/>
        </button>
        <div>
          <p className="font-bold text-2xl text-[#09090B]">Log in</p>
          <p className="text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(checkPassword)}
            className="flex flex-col gap-4 text-[#09090B]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <label className="flex gap-2 cursor-pointer text-[#71717A]">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
                Show password
              </label>
            </div>
            <Button type="submit" className="py-[4px] w-full border rounded-md">
              let&apos;s go
            </Button>
          </form>
        </FormProvider>
        <p
          onClick={() => router.push("/resetpassword")}
          className="text-[#2563EB] cursor-pointer"
        >
          forgot password
        </p>
        <div className="flex w-full justify-center gap-4">
          <p className="text-[#71717A]">Don&apos;t have an account?</p>
          <p
            onClick={() => router.push("/sign-up")}
            className="text-[#2563EB] cursor-pointer"
          >
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
