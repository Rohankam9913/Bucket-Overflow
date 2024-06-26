"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDate, getNewUrl } from "@/utils/constant.util";

const Tagged = ({ params }) => {
    const [questions, setQuestions] = useState([]);
    const [tagInfo, setTagInfo] = useState({});
    const router = useRouter();

    const getAllQuestionsForTag = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/question?tag_id=${params.tag}`);
            const data = await response.json();
            setQuestions(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    const getTagInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getInfoAboutSingleTag?tag=${params.tag}`);
            const data = await response.json();
            setTagInfo(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getAllQuestionsForTag();
        getTagInfo();
    }, [params.tag]);

    return (
        <div className={style.container}>
            <div className={style.cont}>
                <h2>{tagInfo?.tagName}</h2>
                <button onClick={() => router.push("/askQuestion")}>Ask Question</button>
            </div>

            <div className={style.info}>
                <h5>{tagInfo?.tagDescription}</h5>

                <div className={style.filter}>
                    <p>{tagInfo?.tagQuestionCount} questions</p>
                </div>

                <hr className={style.line} />

                {
                    questions.length > 0 && questions?.map((question) =>
                        <div className={style.questions_container} key={question._id}>
                            <div className={style.left}>
                                <p className={style.vote}>{(question?.upvote + question?.downvote)} votes</p>
                                <p className={style.answers}>{question?.answers.length} Answers</p>
                            </div>

                            <div className={style.right}>
                                <Link href={`/all_questions/${getNewUrl(question?.title)}/${question?._id}`}>{question?.title}</Link>

                                <p className={style.question}>{question?.content}</p>

                                <div className={style.tags}>
                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                        {
                                            question?.tags.map((tag) =>
                                                <p className={style.tag} key={tag._id}>{tag.tagName}</p>
                                            )
                                        }
                                    </div>

                                    <div className={style.ques}>
                                        <h4 style={{ fontSize: "20px" }}>Asked By</h4>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Link href={"/"} style={{ fontSize: "15px" }}>{question?.askedBy.username}</Link>
                                            <small className={style.date}>{getDate(question?.createdAt).month} {getDate(question?.createdAt).date}, {getDate(question?.createdAt).year} at {getDate(question?.createdAt).hours}:{getDate(question?.createdAt).minutes}</small>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }


                <hr className={style.line} />
            </div>
        </div>
    )
}

export default Tagged;