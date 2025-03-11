import axios from "axios";

export const getFood = async (category:string) => {
    
    try {
      const response = await axios.get(`http://localhost:3000/food/${category}`);
      return response.data
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };