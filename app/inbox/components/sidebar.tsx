"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../inbox.module.css";

export default function Sidebar() {
    const pathname = usePathname();
    const isChat = pathname === "/inbox/chat";

    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.sidebarTitle}>Inbox</h1>
            <div className={styles.sidebarItems}>
                <Link
                    href="/inbox/notifikasi"
                    className={`${styles.sidebarLink} ${!isChat ? styles.activeMenu : ""}`}
                >
                    <span>&#128276;</span> Notifikasi
                </Link>
                <Link
                    href="/inbox/chat"
                    className={`${styles.sidebarLink} ${isChat ? styles.activeMenu : ""}`}
                >
                    <span>&#128172;</span> Chat
                </Link>
            </div>
        </aside>
    );
}