"use client";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import PostContent from "@/app/components/postContent/PostContent";
import { AuthContext } from "@/app/context/authContext/AuthContext";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";

const PostQuestion = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [tag_name, setTagName] = useState([]);
    const [tag_list, setTagList] = useState([]);
    const { auth } = useContext(AuthContext);
    const errorRef = useRef("");
    const titleRef = useRef("");
    const contentRef = useRef("");
    const router = useRouter();

    const getTags = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tags?sort=get_minimal");
            const data = await response.json();
            setTags(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    const searchTags = (tags) => {
        return tags.filter(tagData => tagData.tagName.toLowerCase().includes(tag.toLowerCase()));
    }

    const getTagInfo = (tag_info) => {
        if (tag_name.length < 3) {
            setTagList([...tag_list, tag_info._id]);

            let arr = [...tag_name];
            if (arr.length === 0) {
                arr[0] = tag_info;
            }

            else {
                arr.push(tag_info);
            }

            setTagName(arr);
            setTag("");
        }
        else {
            errorRef.current.innerHTML = "More than 3 tags";
            errorRef.current.style.fontSize = "20px";
        }
    }

    const cancelTag = (tag) => {
        let new_tag_name = tag_name.filter((tag_n) => tag_n.tagName !== tag.tagName);
        setTagName(new_tag_name);
    }

    const postQuestion = async () => {
        if(auth.length === 0){
            return router.push("/login");
        }

        try {
            if (title.length === 0) titleRef.current.innerHTML = "Title missing";
            if (content.length === 0) contentRef.current.innerHTML = "Content missng";
            if (tag_name.length === 0) errorRef.current.innerHTML = "Provide the tags";
            else {

                const response = await fetch("http://localhost:3000/api/question", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, content, askedBy: auth[0].id, tags: tag_list })
                });

                const data = await response.json();

                if (data.length > 0) {
                    setTitle("");
                    setTags([]);
                    setContent("");
                    router.push("/all_questions");
                }
            }
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className={style.container}>
            <h2>Ask Question and clear your doubts</h2>
            <hr className={style.line} />

            <label className={style.label}>Title  <span className="error" ref={titleRef}></span></label>
            <input type="text" value={title} className={style.input} onChange={(e) => { setTitle(e.target.value); titleRef.current.innerHTML = "" }}></input>

            <label className={style.label}>Content <span className="error" ref={contentRef}></span></label>
            <PostContent content={content} setContent={setContent} contentRef={contentRef} />

            <label className={style.label}>Add Tags <small>(Add atleast one tag)</small>  <span ref={errorRef} className="error"></span></label>
            <input type="text" className={style.input} placeholder="maximum three tags supported" value={tag} onChange={(e) => { setTag(e.target.value); errorRef.current.innerHTML = "" }}></input>

            <div className={style.tagContainer}>
                {
                    tag_name.length > 0 && tag_name?.map((tag, ind) =>
                        <li className={style.list_item} key={ind}><span>{tag.tagName}</span> <MdCancel size={20} color="red" onClick={() => cancelTag(tag)} /></li>
                    )
                }
            </div>

                {
                    tag ?
                        searchTags(tags).map((tag_info) =>
                            <div key={tag_info._id}>
                                <li className={style.list} onClick={() => getTagInfo(tag_info)}>{tag_info.tagName}</li>
                            </div>
                        )
                        : ""
                }
            <button className={style.button} onClick={() => postQuestion()}>Post Question</button>
        </div>
    )
}

export default PostQuestion;