import Image from "next/image";
import style from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <p>BucketOverflow</p>
                <span>Copyright &#169; 2024-2025</span>
            </div>

            <div className={style.social}>
                <Link href={"#"}>Facebook</Link>
                <Link href={"#"}>Twitter</Link>
                <Link href={"#"}>Instragram</Link>
                <Link href={"#"}>Linkedin</Link>
            </div>
        </div>
    )
}

export default Footer;