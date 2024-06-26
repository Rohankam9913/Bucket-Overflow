"use client";
import { useRouter } from "next/navigation";
import style from "./navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext/AuthContext";


const Auth = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const router = useRouter();

    const logout = async () => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            localStorage.removeItem("userInfo");
            setAuth([]);

            const response = await fetch("http://localhost:3000/api/login",{method: "DELETE"});
            const data = await response.json();

            if(data.success){
                router.push("/");
            }
        }
    }

    return (
        <div className={style.auth}>
            {
                auth.length > 0 ?
                    <button className={style.button} onClick={() => logout()}>Logout</button>
                    :
                    <>
                        <button className={style.button} onClick={() => router.push("/login")}>Log in</button>
                        <button className={style.button} onClick={() => router.push("/register")}>Sign up</button>
                    </>

            }

        </div>
    )
}

export default Auth;