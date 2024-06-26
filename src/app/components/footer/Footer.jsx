import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
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
                <Link href={"#"}><FaFacebook size={40}/></Link>
                <Link href={"#"}><FaTwitter size={40}/></Link>
                <Link href={"#"}><FaInstagram size={40}/></Link>
                <Link href={"#"}><FaLinkedin size={40}/></Link>
            </div>
        </div>
    )
}

export default Footer;