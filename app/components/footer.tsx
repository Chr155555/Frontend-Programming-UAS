import Link from "next/link";

export const Footer = () => {
    return (
        <footer>
            <ul>
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
                    <Link href="/">Kebijakan Privasi</Link>
                </li>
                <li>
                    <Link href="">Syarat dan Ketentuan</Link>
                </li>
                <li>
                    <Link href="/">Bantuan</Link>
                </li>
            </ul>
            <li>
                <h2 id="logo">Tiket<span>Ku</span></h2>
            </li>
            <p>
                Email: cs@tiketku.id
            </p>
            <p>
                Call Center: +62 ### #### ####
            </p>
            <p>
                &copy; 2026 Tiketku. All Rights Reserved. Project UTS Front-End Programming.
            </p>
        </footer>
    );
};