import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/" id="logo">Tiket<span>Ku</span></Link>
                    </li>
                    <li>
                        <Link href="/packages">Paket</Link>
                    </li>
                    <li>
                        <Link href="/flights">Penerbangan</Link>
                    </li>
                    <li>
                        <Link href="/hotels">Hotel</Link>
                    </li>
                    <li>
                        <Link href="/history">Pesanan</Link>
                    </li>
                    <li>
                        <Link href="favorites">Favorit</Link>
                    </li>
                    <li>
                        <Link href="/help">Bantuan</Link>
                    </li>
                    <li>
                        <Link href="/profile">Profil</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};