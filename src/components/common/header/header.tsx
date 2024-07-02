"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import logo from "../img/FOURTEEN.Logo.POSITIEF_Green_RGB_v1.png";

const Header: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);


        if (!storedToken)  {
            console.log("Tidak ada token")
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content__container}>
                <div className={styles.logo}>
                    <Link className={styles.linkTitle} href={"/"}>
                        <h1 className={styles.title}>Fourteen</h1>
                    </Link>
                </div>
                <div className={styles.authButtons}>
                    {token ? (
                        <Link className={styles.btn__dashboard} href={'/dashboard'}>Dashboard</Link>
                    ) : (
                        <>
                            <Link className={styles.btn__login} href={'/login'}>Login</Link>
                            <Link className={styles.btn__auth} href={'/register'}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
