"use client";

import { getFrameworks, getLanguages, getTools } from "@/utils/constant.util";
import style from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";

const UpdateProfile = ({ params, searchParams }) => {
    const [username, setUsername] = useState("");
    const buttonRef = useRef();
    const inputRef = useRef();

    const [langInput, setLangInput] = useState("");
    const [lang, setLang] = useState([]);

    const [frameworkInput, setFrameworkInput] = useState("");
    const [frame, setFrame] = useState([]);

    const [toolsInput, setToolsInput] = useState("");
    const [tools, setTools] = useState([]);

    const [save, setSave] = useState(false);

    const langSkills = getLanguages();
    const frameSkills = getFrameworks();
    const toolSkills = getTools();

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${searchParams.profileId}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setLang(data.skills.language);
            setFrame(data.skills.framework);
            setTools(data.skills.tools);
            setUsername(data.username);
        }
        catch (error) {
            alert(error.message);
        }
    }

    const saveChanges = async () => {
        try {
            buttonRef.current.setAttribute("disabled", true);
            buttonRef.current.style.backgroundColor = "grey";

            const response = await fetch("http://localhost:3000/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: searchParams.profileId, skills: { language: lang, framework: frame, tools: tools }, username })
            });

            const data = await response.json();
            setUsername(data.username);
            setLang(data.skills.langauge);
            setFrame(data.skills.framework);
            setTools(data.skills.tools);
            setSave(!save);

            buttonRef.current.setAttribute("disabled", false);
            buttonRef.current.style.backgroundColor = "blueviolet";
        }
        catch (error) {
            alert(error.message);
        }
    }

    const cancel = (type, skill) => {
        if (type === "language") {
            let newLang = lang.filter(language => language !== skill);
            setLang(newLang);
        }

        else if (type === "framework") {
            let newFrame = frame.filter(framework => framework !== skill);
            setFrame(newFrame);
        }

        else if (type === "tools") {
            let newTool = tools.filter(tool => tool !== skill);
            setTools(newTool);
        }
    }

    const filterResults = (skills, skillType) => {
        if (skillType === "language") {
            return skills.filter((skill) => skill.toLowerCase().includes(langInput.toLowerCase()));
        }
        else if (skillType === "framework") {
            return skills.filter((skill) => skill.toLowerCase().includes(frameworkInput.toLowerCase()));
        }
        else if (skillType === "tools") {
            return skills.filter((skill) => skill.toLowerCase().includes(toolsInput.toLowerCase()));
        }
    }

    const add = (skill, skillName) => {
        if (skill === "language") {
            if (langInput.length === 0 || lang.length === 3 || lang.includes(langInput)) {
                return;
            }

            let newLang = [...lang, skillName];
            setLang(newLang);
        }

        else if (skill === "framework") {
            if (frameworkInput.length === 0 || frame.length === 3 || frame.includes(frameworkInput)) {
                return;
            }

            let newFrame = [...frame, skillName];
            setFrame(newFrame);
        }

        else if (skill === "tools" || tools.length === 3 || tools.includes(toolsInput)) {
            if (toolsInput.length === 0) {
                return;
            }

            let newTool = [...tools, skillName];
            setTools(newTool);
        }
    }

    useEffect(() => {
        getUser();
        inputRef.current.focus();
    }, [save]);

    return (
        <div className={style.container}>
            <div className={style.personal}>
                <label className={style.label}>Username</label>
                <input className={style.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className={style.skills}>
                <div className={style.input_group}>
                    <label className={style.label}>Language</label>
                    <input className={style.input} placeholder="Can add upto 3 language skills" ref={inputRef} type="text" value={langInput} onChange={(e) => setLangInput(e.target.value)}></input>
                </div>

                <div className={style.language}>
                    <div className={style.skill_selection}>
                        {
                            langInput ? filterResults(langSkills, "language").map((lang, ind) =>
                                <p key={ind} onClick={() => add("language", lang)} className={style.skill_item}>{lang}</p>
                            ) : ""
                        }
                    </div>

                    <div className={style.skill_cont}>
                        {
                            lang?.map((skill, ind) =>
                                <p className={style.tag} key={ind}>{skill} <MdCancel size={27} onClick={() => cancel("language", skill)} /></p>
                            )
                        }
                    </div>
                </div>

                {/* ---------------------------------------------------------- */}

                <div className={style.input_group}>
                    <label className={style.label}>Framework</label>
                    <input className={style.input} placeholder="Can add upto 3 frameworks" type="text" value={frameworkInput} onChange={(e) => setFrameworkInput(e.target.value)}></input>
                </div>

                <div className={style.language}>
                    <div className={style.skill_selection}>
                        {
                            frameworkInput ? filterResults(frameSkills, "framework").map((frame, ind) =>
                                <p key={ind} onClick={() => add("framework", frame)} className={style.skill_item}>{frame}</p>
                            ) : ""
                        }
                    </div>

                    <div className={style.skill_cont}>
                        {
                            frame?.map((skill, ind) =>
                                <p className={style.tag} key={ind}>{skill} <MdCancel size={27} onClick={() => cancel("framework", skill)} /></p>
                            )
                        }
                    </div>
                </div>

                {/* ---------------------------------------------------------- */}

                <div className={style.input_group}>
                    <label className={style.label}>Tools</label>
                    <input className={style.input} placeholder="Can add upto 3 tools and technologies" type="text" value={toolsInput} onChange={(e) => setToolsInput(e.target.value)}></input>
                </div>

                <div className={style.language}>
                    <div className={style.skill_selection}>
                        {
                            toolsInput ? filterResults(toolSkills, "tools").map((tool, ind) =>
                                <p key={ind} onClick={() => add("tools", tool)} className={style.skill_item}>{tool}</p>
                            ) : ""
                        }
                    </div>

                    <div className={style.skill_cont}>
                        {
                            tools?.map((skill, ind) =>
                                <p className={style.tag} key={ind}>{skill} <MdCancel size={27} onClick={() => cancel("tools", skill)} /></p>
                            )
                        }
                    </div>
                </div>

                <button type={"button"} className={style.save} onClick={() => saveChanges()} ref={buttonRef}>Save Changes</button>
            </div>
        </div>
    )
}

export default UpdateProfile;