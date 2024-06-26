"use client";
import Link from "next/link";
import style from "./page.module.css";
import Vote from "@/app/components/vote/Vote";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import PostContent from "@/app/components/postContent/PostContent";
import { getDate, getDetailedDate } from "@/utils/constant.util";
import { AuthContext } from "@/app/context/authContext/AuthContext";
import { useRouter } from "next/navigation";

const SingleQuestion = ({ params }) => {
    const [answers, setAnswers] = useState([]);
    const [content, setContent] = useState("");
    const { auth } = useContext(AuthContext);
    const [posted, setPosted] = useState(false);
    const contentRef = useRef("");
    const router = useRouter();
    const [commentContent, setCommentContent] = useState("");
    const [limit, setLimit] = useState(3);

    const getDetailsAboutQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/answer?question_id=${params.questionId}&limit=${limit}`);
            const data = await response.json();
            setAnswers(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    const PostAnswer = async () => {
        if(auth.length === 0){
            return router.push("/login");
        }

        try {
            if (content.length === 0) {
                contentRef.current.innerHTML = "Answer missing";
                contentRef.current.classList.add("error");
                return;
            }

            const response = await fetch("http://localhost:3000/api/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId: params.questionId, content, answerBy: auth[0].id })
            });

            await response.json();
            setContent("");
            setPosted(!posted);
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getDetailsAboutQuestion();
    }, [posted, limit]);

    const postComment = async (type, id) => {
        if(auth.length === 0){
            return router.push("/login");
        }
        
        try {
            const response = await fetch("http://localhost:3000/api/postComment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, type, commentBy: auth[0].id, content: commentContent })
            });
            const data = await response.json();
            console.log(data[0]);

            let ans = [...answers];
            let comment = ans[0].comment;

            comment.push(data[0]);
        }
        catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className={style.container}>
            <div className={style.heading}>
                <h2>{answers[0]?.title}</h2>
                <button onClick={() => router.push("/askQuestion")}>Ask Question</button>
            </div>

            <div className={style.date}>
                {getDetailedDate(answers[0]?.createdAt)}
                <p style={{ fontSize: "16px" }}>Asked by <Link href={`/profile/${answers[0]?.askedBy._id}`}>{answers[0]?.askedBy.username}</Link></p>
            </div>

            <hr className={style.line} />

            <div className={style.content}>
                {answers.length > 0 ? <Vote score={(answers[0].upvote + answers[0].downvote)} questionId={params.questionId} /> : ""}

                <div className={style.right}>
                    <p className={style.description}>{answers[0]?.content}</p>

                    <div className={style.tags}>
                        {
                            answers[0]?.tags.map((tag) =>
                                <div className={style.tag} key={tag._id}>{tag.tagName}</div>
                            )
                        }
                    </div>

                    <div className={style.all_comments}>

                        <div className={style.info}>
                            <h4>{answers[0]?.comment.length} Comments</h4>
                            {
                                answers.length > 0 && answers[0]?.comment?.map((comment, ind) =>
                                    <div className={style.single_comment} key={comment._id}>
                                        <p>{comment.content}</p>
                                        <small>Commented by <Link style={{ fontSize: "15px", color: "red" }} href={`/profile/${comment.commentBy._id}`}>{comment.commentBy.username}</Link> at {getDate(comment.createdAt).hours}:{getDate(comment.createdAt).minutes} on {getDate(comment.createdAt).date} {getDate(comment.createdAt).month} {getDate(comment.createdAt).year}</small>
                                    </div>
                                )
                            }
                        </div>

                        {
                            limit <= answers[0]?.comment.length ? <button className={style.load_more} onClick={() => setLimit(limit + 2)}>Load more</button> : <button className={style.load_more} onClick={() => setLimit(limit - 2 - 2)}>Show less</button>
                        }

                        <div className={style.comment}>
                            <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>

                            <button className={style.post_comment} onClick={() => postComment("question", answers[0]?._id)}>Add Comment</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={style.line} />

            <div className={style.ans}>
                <h2 style={{ fontWeight: "200", fontSize: "18px" }} className={style.heading}>{answers[0]?.answers.length} Answers</h2>
            </div>

            {
                answers.length > 0 && answers[0].answers.length > 0 && answers[0].answers.map((answer) =>
                    <Fragment key={answer._id}>
                        <div className={style.content}>
                            <Vote score={(answer.upvote + answer.downvote)} answerId={answer._id} />

                            <div className={style.right}>
                                <p className={style.description}>{answer.content}</p>
                                <div className={style.info}>
                                    <p>Answered by  <Link style={{ color: "red" }} href={`/profile/${answers[0]?.askedBy._id}`}>{answers[0]?.askedBy.username}</Link> on {getDate(answer.createdAt).date} {getDate(answer.createdAt).month}, {getDate(answer.createdAt).year}</p>
                                </div>
                            </div>

                        </div>
                        <hr className={style.line} />
                    </Fragment>
                )
            }

            <h4 style={{ color: "grey", marginTop: "20px", marginBottom: "10px" }}>Write your answer here   <span style={{ marginLeft: "10px" }} ref={contentRef}></span></h4>

            <PostContent content={content} setContent={setContent} contentRef={contentRef} />

            <button className={style.button} onClick={() => PostAnswer()}>Post Answer</button>
        </div>
    )
}

export default SingleQuestion;


