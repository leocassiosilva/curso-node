import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import styles from "./Navbar.module.css";
import { useContext } from "react";
/* Context*/
import {Context} from '../../context/UserContext'

function Navbar() {
    const {authenticated } = useContext(Context)
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet Logo" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {authenticated ? (
                    <>
                    <p>Logado</p>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;