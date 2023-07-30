"use client";
import { createContext, useContext, useState } from "react";

const MainNavigationContext = createContext();

export function MainNavigationProvider({ children }) {
  const [rerenderNavigation, setRerenderNavigation] = useState(false);

  return (
    <MainNavigationContext.Provider
      value={{ rerenderNavigation, setRerenderNavigation }}
    >
      {children}
    </MainNavigationContext.Provider>
  );
}

export function useMainNavigation() {
  const context = useContext(MainNavigationContext);
  if (!context) {
    throw new Error(
      "useMainNavigation must be used within a MainNavigationProvider"
    );
  }
  return context;
}
