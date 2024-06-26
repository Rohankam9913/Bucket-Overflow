"use client";
import { useRouter } from "next/navigation";
import style from "./tags.module.css";
import { useEffect, useState } from "react";

const Tags = () => {
    const [tags, setTags] = useState([]);
    const router = useRouter();
    const [search,setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const getAllTags = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tags?sort=${filter}`, { method: "GET" });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setTags(data);
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getAllTags();
    }, [filter]);

    const SeachData = (tags)=>{
        return tags.filter((tag)=> tag.tagName.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <div className={style.container}>

            <div className={style.cont}>
                <h2>Tags</h2>
                <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using
                    the right tags makes it easier for others to find and answer your question.</p>
            </div>

            <div className={style.search}>
                <input type="text" placeholder="Filter by tag name" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                <select className={style.filter} onChange={(e)=>setFilter(e.target.value)}>
                    <option value={"all"}>All tags</option>
                    <option value={"language"}>Language</option>
                    <option value={"framework"}>Framework</option>
                    <option value={"tools"}>tools</option>
                    <option value={"dsa"}>DSA</option>
                </select>
            </div>

            <div className={style.tag_container}>
                {
                    SeachData(tags).map((tag, ind) =>
                        <div className={style.box} key={ind}>
                            <div className={style.group}>
                                <button onClick={()=>router.push(`singleTag/${tag.tagName}/${tag._id}`)}>{tag.tagName}</button>
                                <p className={style.questions}>Total Questions : {tag.tagQuestionCount}</p>
                            </div>
                            <p>{tag.tagDescription}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Tags;

