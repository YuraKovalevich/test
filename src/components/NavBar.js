import React from 'react';
import {Link} from "react-router-dom";
import {DATA_DATE_ROUTE, RATE_DATE_ROUTER} from "../utils/consts";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return (
        <div className={styles.headerNav}>
            <div className={styles.container}>
                <nav className={styles.navbar__menu}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__item}>
                            <Link to={DATA_DATE_ROUTE} className={styles.menu__link}>Данные по валютам за определенный день</Link>
                        </li>
                        <li className={styles.menu__item}>
                            <Link to={RATE_DATE_ROUTER} className={styles.menu__link}>Курса любой валюты в динамике</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;