"use client";
import Link from "next/link";
import style from "../page.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/authContext/AuthContext";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const input = useRef("");

    useEffect(() => {
        input.current.focus();
    }, []);


    const handleFormSubmission = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Credentials Missing");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!data.error) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                setAuth([data]);
                router.back();
            }
            else {
                throw new Error(data.error);
            }

        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={style.container}>

            <div className={style.logo}>
                <p>BucketOverflow</p>
            </div>

            <div className={style.line}></div>

            <form className={style.form} onSubmit={handleFormSubmission}>
                <label className={style.label}>Email</label>
                <input className={style.input} type="text" ref={input} value={email} onChange={(e) => { setEmail(e.target.value), setError(""); }} />

                <label className={style.label}>Password</label>
                <span className={style.input_group}>
                    <input className={style.input} type={show ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value), setError(""); }} />
                    <button className={style.show} type="button" onClick={() => setShow(!show)}>Show</button>
                </span>

                <span className={"error"}>{error}</span>

                <button className={style.button}>Log in</button>

                <span className={style.auth_link}>Don't have an account ? <Link href={"/register"}>Sign up</Link></span>
            </form>
        </div>
    )
}

export default Login;