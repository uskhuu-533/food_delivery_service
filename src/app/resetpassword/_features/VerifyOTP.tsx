"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyOneTimePAssword } from "@/utils/authReq";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
type props = {
  email: string;
  setStep:(step:number)=> void
};

const VerifyOTP = ({ email, setStep }: props) => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('aaaa');
    
    try{
      const response = await VerifyOneTimePAssword(email, data.pin)
      if (response?.status === 200) {
        setStep(3)
      }else {
        
      }
    }catch(error){
      console.log(error);
      if (error instanceof z.ZodError) {
        throw new Error(error.errors.map((err) => err.message).join(", "));
      }
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <div className="w-[400px]">
      <div>
        <p className="font-bold text-md">Send your {email} email one code</p>
      </div>
      <div className="w-full h-full flex itmes-center justify-center">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone. if you don&apos;t get code check your email spam
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <Button type="submit" className="w-full">let&apos;s go</Button>
        </form>
      </FormProvider>
      </div>
      </div>
    </div>
  );
};
export default VerifyOTP;
