"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { setToken } from "./store/token/tokenSlice";

const queryClient = new QueryClient();

const ClientProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(setToken(token));
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default ClientProviders;
