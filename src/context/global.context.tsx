
import { createContext } from "react";
import useGlobalProvider from "hooks/useGlobal.provider";


export const GlobalContext = createContext({});

export function GlobalProvider({ children }: any) {
  const values = useGlobalProvider();

  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  )
}
