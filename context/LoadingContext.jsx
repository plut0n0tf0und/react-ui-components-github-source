import React, { createContext, useContext, useState } from "react";
import Loading from "../components/Loading/Loading";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    // Return a fallback so calling components don't crash if they are rendered outside the provider
    return { isLoading: false, setIsLoading: () => {} };
  }
  return context;
};
