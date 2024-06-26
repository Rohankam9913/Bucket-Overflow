"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState([]);
    const router = useRouter()

    useEffect(()=>{
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        if(userInfo){
            setAuth([userInfo]);
        }
        // else{
        //     router.push("/login");
        // }
    },[]);

    return <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
}