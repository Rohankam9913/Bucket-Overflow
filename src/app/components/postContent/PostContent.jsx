"use client";
import style from "./page.module.css";

export default function PostContent({ content, setContent, contentRef }) {
    return (
        <div className={style.container}>
            <textarea contentEditable={true} value={content} onChange={(e)=>{setContent(e.target.value); contentRef.current.innerHTML=""}} className={style.textEditor}></textarea>
        </div>
    )
}
