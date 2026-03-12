"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const Context = createContext<{
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

const MainContext = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Context.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </Context.Provider>
  );
};

export const useData = () => {
  const data = useContext(Context);
  return data;
};

export default MainContext;
