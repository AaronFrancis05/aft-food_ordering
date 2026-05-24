import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {ReactComponent} from "expo-router/build/testing-library/context-stubs";
import {getCurrentUser} from "@/lib/appwrite";
// 1. Define the User object shape
interface User {
    $id: string;
    name: string;
    email: string;
    avatarUrl: string;
}

// 2. Define the exact shape of your Context State
interface GlobalContextType {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;

    setIsLoading: (value: boolean) => void;
    setIsLoggedIn: (value: boolean) => void;
}
interface GlobalProviderProps {
    children: ReactNode;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider =({children}:GlobalProviderProps)=>{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User |null>(null)

    useEffect(()=>{
        const fetchCurrentUser= async ()=>{
            try {
                const currentUser = await getCurrentUser();

                if (!currentUser) {
                    setUser(null);
                    setIsLoggedIn(false);
                    return;
                }
                const {userId,name,email,avatarUrl} = currentUser;
                const newUser={$id:userId,name,email,avatarUrl};
                setIsLoggedIn(true);
                setUser(newUser);
            }catch (e) {
                console.log(e)
                throw new Error(e as string);
            }finally{
                setIsLoading(false)
            }
            // console.log(user)
        }
        fetchCurrentUser();
    },[])
    console.log(isLoggedIn,isLoading,JSON.stringify(user,null,2))
    return(
                <GlobalContext.Provider
                    value={{
                        user,
                        isLoading,
                        setIsLoading,
                        isLoggedIn,
                        setIsLoggedIn,
                        setUser
                    }}
                >
                        {children}
                </GlobalContext.Provider>
          )

}


export default GlobalProvider;

export const useGlobalContext=()=>{
    const context = useContext(GlobalContext);

        if (context === undefined) {
            throw new Error('useGlobalContext must be used within a GlobalProvider');
        }

        return context;
    }