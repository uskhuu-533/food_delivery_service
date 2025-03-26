'use client'

import { createContext, useState, useContext, ReactNode } from "react";

type DebounceLoaderContextype = {
  debounceLoading : boolean,
  setDebLoading : (loading : boolean) => void
}
const DebounceLoaderContext = createContext<DebounceLoaderContextype | undefined>(undefined);

export const DebounceLoadingProvider = ({ children }:{children : ReactNode}) => {
  const [debounceLoading, setDebLoading] = useState(false);
  return (
    <DebounceLoaderContext.Provider value={{debounceLoading, setDebLoading }}>
      {children}
    </DebounceLoaderContext.Provider>
  );
};

export const useDebounceLoading = () => {
  const contex = useContext(DebounceLoaderContext)
  if (!contex) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return contex
};