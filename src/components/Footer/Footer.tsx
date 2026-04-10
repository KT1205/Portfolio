"use client";

import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div className={styles.statusLine}>
                    [EOF] // END OF_FILE :: SYSTEM RESOURCES STABLE
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} AI_OPERATOR_KL-90X
                </div>
            </div>
        </footer>
    );
}
