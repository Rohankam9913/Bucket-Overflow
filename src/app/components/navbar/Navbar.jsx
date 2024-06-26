import Link from "next/link";
import style from "./navbar.module.css";
import Auth from "./Auth";
import Hamburger from "./HamburgerComponent";


const NavBar = () => {
    return (
        <div className={style.container}>
            <div className={style.left_side}>
                <Hamburger />

                <div className={style.logo}>
                    <Link href={"/"}>BucketOverflow</Link>
                </div>
            </div>

            <Auth />
        </div>
    )
}

export default NavBar;