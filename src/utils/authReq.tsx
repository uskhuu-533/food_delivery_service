import axios from "axios";
const URL = "https://food-backend-8ud7.onrender.com"
export const sendOneTimePassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${URL}/opt/generate-otp`,
      { email: email }
    );
    return response
  } catch (error) {
    console.log(error);
  }
};

export const VerifyOneTimePAssword = async (email:string, otp:string) => {
    try {
        const response = await axios.post(
            `${URL}/opt/verify-otp`,
            { email: email, otp:otp }
          );
          console.log(response);
          return response
    } catch (error) {
        console.log(error);
    }
} 
