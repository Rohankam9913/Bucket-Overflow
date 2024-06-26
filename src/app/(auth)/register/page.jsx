"use client";
import Link from "next/link";
import style from "../page.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState({ username: "", email: "", password: "" });
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const input = useRef("");

    useEffect(()=>{
        input.current.focus();   
    },[]);

    const validateEmail = (email)=>{
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        let result = regex.test(email);
        if(result){
            return true;
        }
    
        return false;
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        let error = {username: "", email: "", password: ""};

        if (!username) error.username = "Username missing";
        if (!email) error.email = "Email missing";
        if(!password) error.password = "Password missing";

        if(password.length < 6){
            error.password = "Password must be atleast 6 characters long";
        }

        if(validateEmail(email) === false){
            error.email = "Provided email is invalid";
        }

        if(error.username.length > 0 || error.email.length > 0 || error.password.length > 0){
            setError(error);
        }

        else{
            try{
                const response = await fetch("http://localhost:3000/api/register", {
                    method: "POST",
                    headers: {"Content-Type" : "applicaton/json"},
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                if(data.error === "User Already Exists"){
                    error.email = data.error;
                    setError(error);
                    return;
                }
                else{
                    setTimeout(()=>{
                        router.back();
                    },1200);
                }
                
            }
            catch(error){
                alert(error.message);
            }
        }

    }

    return (
        <div className={style.container}>

            <div className={style.logo}>
                <p>BucketOverflow</p>
            </div>

            <div className={style.line}></div>

            <form className={style.form} onSubmit={handleFormSubmission}>
                <label className={style.label}>Username</label>
                <input className={style.input} type="text" ref={input} value={username} onChange={(e) => {setUsername(e.target.value); setError({...error, username: ""})}} />
                <span className={"error"}>{error.username}</span>

                <label className={style.label}>Email</label>
                <input className={style.input} type="text" value={email} onChange={(e) => {setEmail(e.target.value); setError({...error, email: ""})}} />
                <span className={"error"}>{error.email}</span>

                <label className={style.label}>Password</label>
                <span className={style.input_group}>
                    <input className={style.input} type={show ? "text" : "password"} value={password} onChange={(e) => {setPassword(e.target.value); setError({...error, password: ""})}} />
                    <button className={style.show} type="button" onClick={() => setShow(!show)}>Show</button>
                </span>
                <span className={"error"}>{error.password}</span>

                <button className={style.button}>Sign up</button>
                <span className={style.auth_link}>Already have an account? <Link href={"/login"}>Log in</Link></span>
            </form>
        </div>
    )
}

export default Register;