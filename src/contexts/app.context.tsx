import { SetStateAction, createContext, useState } from "react";
import { getAccessTokenFromLs, getProfileFromLs } from "../utils/auth";
import { User } from "../types/user.type";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null,
  setProfile:React.Dispatch<SetStateAction<User | null>>
}

//chay dau tien
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLs()),
  setIsAuthenticated: () => null,
  profile:getProfileFromLs(),
  setProfile:() => null,
};



export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({children}: {children: React.ReactNode;}) => {
  const [profile,setProfile] = useState<User| null>(initialAppContext.profile)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated // lan dau false
  );

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

