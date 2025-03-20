import axios from "axios";

export const sendOneTimePassword = async (email: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/opt/generate-otp",
      { email: email }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const VerifyOneTimePAssword = async (email:string, otp:string) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/opt/verify-otp",
            { email: email, otp:otp }
          );
          console.log(response);
          return response
    } catch (error) {
        console.log(error);
    }
} 
