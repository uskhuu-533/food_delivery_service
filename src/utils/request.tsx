import axios from "axios";
type food = {
  _id: string;
};
type User = {
    email: string;
    password: string;
    address : string
  };

// const URL = "http://localhost:3000"
// const URL = "https://food-service-cyan.vercel.app"  
const URL = "https://food-backend-8ud7.onrender.com"
export const getFood = async (category: string) => {
  try {
    const response = await axios.get(`${URL}/food/${category}`);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching food data:", error);
  }
};

export const addToOrder = async (
  cartItems: food[],
  totalPrice: number,
  getCartItems : () => Promise<void>
) => {
  if (cartItems.length === 0) return;
  try {
    const token = localStorage.getItem("user");
    console.log(token);

    const response = await axios.post(
      `${URL}/foodorder`,
      { foodOrderItems: cartItems, totalPrice: totalPrice },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);

    const res = await axios.patch(
      `${URL}/foodorderitems`,
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    getCartItems();
  } catch (error) {
    console.log(error);
  }
};
export const getUserEmail = async () => {
  const token = localStorage.getItem("user");
  try {
    const response = await axios.get<User>(`${URL}/users`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    
    return response.data || null
  } catch (error) {
    console.log(error);
  }
};
export const checkPasswordLogin = async (form: object) => {
  try {
    const response = await axios.post(`${URL}/users/login`, form);
      return response
    
  } catch (err) {
    console.error("Error posting user:", err);
  }
};

export const getOrders = async () => {
  const token = localStorage.getItem("user");
  try {
    const response = await axios.get(`${URL}/foodorder`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCartItems = async (itemId: string) => {
  try {
    const response = await axios.get(`${URL}/foodorderitems/${itemId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};



export const getUserAddress = async () => {
  const token = localStorage.getItem("user");
  try {
    const response = await axios.get(`${URL}/users/address`, {
      headers: {
        Authorization: token,
      },
    });    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addToCartReq = async (food: food, count: number) => {
  try {
    const token = localStorage.getItem("user");
    const response = await axios.post(
      `${URL}/foodorderitems/${food._id}`,
      { count: count },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
};
export const fetchFoodDetail = async (foodId: string) => {
  try {
    const response = await axios.get(`${URL}/food/orderitem/${foodId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = async () => {
  const token = localStorage.getItem("user");
  try {
    const response = await axios.get(`${URL}/foodorderitems`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const putOrderItem = async (item: string, delta: number) => {
  try {
    await axios.put(`${URL}/foodorderitems/${item}`, {
      count: delta,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (item: string) => {
  try {
    const response = await axios.delete(
      `${URL}/foodorderitems/${item}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(`${URL}/category`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export  const putUser = async (location:string) => {
    const token = localStorage.getItem("user");
    try {
      const response = await axios.put(
        `${URL}/users`,
        { address: location },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    console.log(response);
    
    } catch (error) {
      console.log(error);
    }
  };

  export const postNewUser = async (newUser:User) => {
    try {
        const response = await axios.post(`${URL}/users`, newUser);
        console.log(response);
       return response
      } catch (err) {
        console.error("Error posting user:", err);
    }
  }