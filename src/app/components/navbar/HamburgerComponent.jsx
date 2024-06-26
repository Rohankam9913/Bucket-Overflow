"use client";

import { useState, useContext } from "react";
import style from "./navbar.module.css";
import Link from "next/link";
import { FaHome,FaQuestion,FaTags,FaUsers,FaMoon } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { AuthContext } from "@/app/context/authContext/AuthContext";

const Hamburger = () => {
    const [open, setOpen] = useState(false);
    const { auth } = useContext(AuthContext);

    return (
        <div className={style.hamburger} onClick={()=> setOpen(!open)}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
  
                {
                   open &&
                    <div className={style.menu}>
                        <Link href={"/"}><FaHome size={28}/> Home</Link>
                        <Link href={"/all_questions"}><FaQuestion size={28}/> Questions</Link>
                        <Link href={"/tags"}><FaTags size={28}/>Tags</Link>

                        <br />

                        <Link href={"/users"}><FaUsers size={28}/>Users</Link>
                        {auth[0] ? <Link href={`/profile/${auth[0].id}`}><RiAccountCircleLine size={28}/>Profile</Link> : ""}
                        <Link href={"#"}><FaMoon size={28} />Dark Theme</Link>
                    </div> 
                }
        </div>
    )
}

export default Hamburger;