"use client";

import { getOrders } from "@/utils/request";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Order = {
  _id: string;
  userData: {
    email: string;
    address: string;
  };
  orderItems: item[];
  createdAt: string;
  totalPrice: number;
  status: string;
};
type item = {
  food: { food_name: string; food_image: string };
  quantity: number;
};

type OrderProviderType = {
  data: Order | null;
  getOrder: () => Promise<void>;
  loadingOrder: boolean;
  setLoadingOrder: (_loadingFood: boolean) => void;
  setData : (_data : Order) => void
};

const OrderContext = createContext<OrderProviderType | null>(null);

export const OrderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<Order | null>(null);
  
  const [loadingOrder, setLoadingOrder] = useState(false);

  const getOrder = async () => {
    const data = await getOrders();
      setData(data);
      setLoadingOrder(false)
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <OrderContext.Provider
      value={{ data, getOrder, loadingOrder, setLoadingOrder, setData }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
