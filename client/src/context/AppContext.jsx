import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

export const AppContext = createContext();

export const AppContextProvier = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState([]);

  return (
    <AppContext.Provider value={{ progress, setProgress, user, setUser }}>
      <>
        <Toaster />
        <LoadingBar color="black" height={3} />
        <div>{children}</div>
      </>
    </AppContext.Provider>
  );
};
