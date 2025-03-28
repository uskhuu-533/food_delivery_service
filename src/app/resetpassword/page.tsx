'use client'

import { useState } from "react"
import EmailInput from "./_features/EmailInput"
import VerifyOTP from "./_features/VerifyOTP"
import NewPassword from "./_features/NewPassword"


const Home = () =>{
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    return(
        <div className="w-full flex h-screen items-center justify-center">
            {step === 1 &&(<EmailInput email={email} setEmail={setEmail} setStep={setStep}/>)}
            {step === 2 && (<VerifyOTP email={email} setStep={setStep}/>)}
            {step === 3 && (<NewPassword email={email}/>)} 
        </div>
    )
}
export default Home