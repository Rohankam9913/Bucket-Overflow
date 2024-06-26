import Link from "next/link";
import style from "./page.module.css";

export default function Home() {
    return (
        <div className={style.container}>
            <div className={style.cont}>
                <div className={style.left_div}>
                    <p>Find the best answer to your technical<br></br> question, help others answer theirs</p>
                    <button className={style.community}><Link href={"/login"}>Join the Community</Link></button>
                </div>

                <div className={style.right_div}>
                    <p>Want a secure, private space for your <br></br>technical knowledge?</p>
                    <button className={style.teams}><Link href={"#"}>Discover Teams</Link></button>
                </div>
            </div>

            <h2 className={style.description}>
                Every developer has a <br />
                tab open to <span style={{ color: "orange" }}>Bucket Overflow</span>
            </h2>

            <div className={style.seperator}></div>

            <div className={style.testimonial}>
                <div className={style.div_1}>
                    <h3>100+ million</h3>
                    <p>monthly visitors to Bucket Overflow</p>
                </div>

                <div className={style.div_2}>
                    <h3>45.1+ billion</h3>
                    <p>monthly visitors to Bucket Overflow</p>
                </div>

                <div className={style.div_2}>
                    <h3>1000+</h3>
                    <p>Questions are posted and answered everyday</p>
                </div>
            </div>

            <div className={style.seperator}></div>
        </div>
    )
}