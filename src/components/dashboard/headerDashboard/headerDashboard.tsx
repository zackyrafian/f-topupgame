import { useEffect, useState } from "react";
import styles from './headerDashboard.module.css'

const HeaderDashboard: React.FC = () => {
  const [username , setUsername] = useState('')
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUsername(user);
        }
    }, []);
  return (
    <div>
        <div className={styles.card__container}>
          <div className={styles.card}>
            <h3 className={styles.title__welcome}>Welcome Back,</h3>
            <h2 className={styles.title}>{username}</h2> 
          </div>

        </div>

    </div>
  );
};

export default HeaderDashboard;
