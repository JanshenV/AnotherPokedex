import { createContext } from "react";
import useGlobalProvider from "../hooks/useGlobalProvider";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const values = useGlobalProvider();

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;