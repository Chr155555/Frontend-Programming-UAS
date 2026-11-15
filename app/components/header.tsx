"use client";

import Link from "next/link";
import { Button, Dropdown } from "react-bootstrap";

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
                        <Link href="/hotel">Hotel</Link>
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
                </ul>
            </nav>
            <ul className="profil">
                <li>
                    <Button variant="secondary"><i className="bi bi-envelope-fill"></i></Button>
                </li>
                <li>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="primary" id="dropdown-profil">
                            <i className="bi bi-person-fill"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow border-0 rounded-3 mt-2">
                            <Dropdown.Item href="/profil">
                                <i className="bi bi-person me-2"></i>Profil
                            </Dropdown.Item>
                            <Dropdown.Item href="/favorite">
                                <i className="bi bi-heart me-2"></i>Favorite
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={() => console.log("Logout diklik")}
                                className="text-danger"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>Keluar (Logout)
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
            <ul className="header-auth">
                <li>
                    <Link href="/auth">Login</Link>
                </li>
                <li>
                    <Link href="/auth?mode=register">Daftar</Link>
                </li>
            </ul>
        </header>
    );
};
