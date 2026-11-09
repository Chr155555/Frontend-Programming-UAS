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
                        <Link href="/">Paket</Link>
                    </li>
                    <li>
                        <Link href="/tiket">Penerbangan</Link>
                    </li>
                    <li>
                        <Link href="/">Hotel</Link>
                    </li>
                    <li>
                        <Link href="/">Pesanan</Link>
                    </li>
                    <li>
                        <Link href="/">Favorit</Link>
                    </li>
                    <li>
                        <Link href="/">Bantuan</Link>
                    </li>
                    <li>
                        <Link href="/">Profil</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};