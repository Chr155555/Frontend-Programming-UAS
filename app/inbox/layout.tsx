import InboxSidebar from "./components/sidebar";
import styles from "./inbox.module.css";

export default function InboxLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={styles.pageWrapper}>
            <div className={styles.container}>
                <InboxSidebar />
                {children}
            </div>
        </main>
    );
}