"use client";
import { useContext, useState } from "react";
import style from "./page.module.css";
import { BiDownArrow, BiUpArrow } from "react-icons/bi"
import { AuthContext } from "@/app/context/authContext/AuthContext";
import { useRouter } from "next/navigation";

export default function Vote({ score, questionId, answerId }) {
    const [total, setTotal] = useState(score);
    const { auth } = useContext(AuthContext);
    const router = useRouter();

    const UpVoteAndDownVoteForQuestions = async (val) => {
        if(auth.length === 0){
            return router.push("/login");
        }

        try {
            const response = await fetch("http://localhost:3000/api/question", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId, val })
            });

            const data = await response.json();
        
            setTotal(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    const UpVoteAndDownVoteForAnswers = async (val) => {
        if(auth.length === 0){
            return router.push("/login");
        }
        try {
            const response = await fetch("http://localhost:3000/api/answer", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answerId, val })
            });

            const data = await response.json();
            setTotal(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    const vote = (val) => {
        if (questionId) {
            UpVoteAndDownVoteForQuestions(val);
        }
        else{
            UpVoteAndDownVoteForAnswers(val);
        }
    }

    return (
        <div className={style.vote}>
            <button className={style.vote_btn}><BiUpArrow size={40} onClick={() => vote(true)}/></button>
            <div style={{ fontSize: "17px", fontWeight: 900 }}>{total}</div>
            <button className={style.vote_btn}><BiDownArrow size={40} fill="black" onClick={() => vote(false)} /></button>
        </div>
    )
}