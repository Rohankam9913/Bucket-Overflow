"use client";

import Link from "next/link";
import style from "./users.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("reputation");

    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users?sort=${filter}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }
            setUsers(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [filter])

    const searchUsers = (users) => {
        return users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <div className={style.container}>
            <h2 className={style.heading}>Users</h2>

            <div className={style.search}>
                <input type="text" placeholder="Filter by tag name" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <select className={style.filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value={"reputation"}>Reputation</option>
                    <option value={"new"}>New User</option>
                    <option value={"old"}>Old User</option>
                </select>
            </div>

            <div className={style.user_container}>
                {
                    searchUsers(users).map((user, ind) =>
                        <div className={style.box} key={ind}>
                            <div className={style.group}>
                                <Image src={"/favicon.ico"} width={50} height={50} alt="profile" />
                                <div style={{display: "flex",flexDirection: "column" , gap: "10px"}}>
                                    <Link href={`/profile/${user._id}`}>{user.username}</Link>
                                    <p><FaQuestion /> Questions Asked: {user.questions}</p>
                                    <p><MdQuestionAnswer /> Answers Provided: {user.answer}</p>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Users;

