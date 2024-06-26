"use client";
import { useParams, useRouter } from "next/navigation";
import style from "./profile.module.css";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaQuestion } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { AuthContext } from "@/app/context/authContext/AuthContext";

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const params = useParams();
    const [newUsername, setNewUserName] = useState("");
    const router = useRouter();

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${params.user_id}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setNewUserName(data.username);
            setUser(data);
        }
        catch (error) {
            alert(error.message);
        }
    }


    useEffect(() => {
        getUser();
    }, [params.user_id]);

    return (
        <div className={style.container}>
            <div className={style.info_container}>
                <span className={style.left}>
                    <FaUser size={100} />
                </span>

                <span className={style.right}>
                    <input readOnly value={newUsername}></input>

                    {
                        auth.length > 0 && auth[0].id === params.user_id ?
                            <button onClick={() => router.push(`/profile/update_profile?profileId=${params.user_id}`)}>Edit Profile</button>
                            : ""
                    }
                </span>
            </div>

            <div className={style.stats}>
                <h1>Community Stats</h1>
                <p><FaQuestion /> Questions Asked: {user.questions}</p>
                <p><MdQuestionAnswer /> Answers Provided: {user.answer}</p>
            </div>

            <div className={style.skills}>

                <h1>Skills <small style={{fontSize:"14px", color:"grey"}}>(Add maximum of 3 skill for each section)</small></h1>

                <h4>Languages</h4>
                <span className={style.skill}>
                    {
                        user?.skills?.language?.map((skill, ind) =>
                            <p key={ind}>{skill}</p>
                        )
                    }
                </span>

                <hr />

                <h4>Frameworks and library</h4>
                <span className={style.skill}>
                    {
                        user?.skills?.framework?.map((skill, ind) =>
                            <p key={ind}>{skill}</p>
                        )
                    }
                </span>

                <hr />

                <h4>Tools</h4>
                <span className={style.skill}>
                    {
                        user?.skills?.tools?.map((skill, ind) =>
                            <p key={ind}>{skill}</p>
                        )
                    }
                </span>

                <hr />


            </div>
        </div>
    )
}

export default Profile;