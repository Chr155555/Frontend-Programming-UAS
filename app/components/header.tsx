"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";

interface AuthUser {
    id: number;
    nama: string;
    email: string;
}

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [fotoProfil, setFotoProfil] = useState<string | null>(null);

    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem("tiketku_user");
                const parsed = stored ? JSON.parse(stored) : null;
                setUser(parsed);

                if (parsed && parsed.email) {
                    const savedFoto = localStorage.getItem("tiketku_foto_" + parsed.email);
                    setFotoProfil(savedFoto);
                } else {
                    setFotoProfil(null);
                }
            } catch {
                setUser(null);
                setFotoProfil(null);
            }
        };

        syncUser();
        window.addEventListener("storage", syncUser);
        window.addEventListener("tiketku-auth-change", syncUser);

        return () => {
            window.removeEventListener("storage", syncUser);
            window.removeEventListener("tiketku-auth-change", syncUser);
        };
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
        if (!confirmLogout) return;

        localStorage.removeItem("tiketku_user");
        setUser(null);
        setFotoProfil(null);
        window.dispatchEvent(new Event("tiketku-auth-change"));
        router.push("/auth?mode=login");
    };

    return (
        <Navbar expand="lg" className="bg-light shadow-sm py-2">
            <style>{`
                #dropdown-profil::after {
                    display: none !important;
                }
            `}</style>

            <Container fluid>
                <Navbar.Brand as={Link} href="/" id="logo" className="me-lg-5">
                    Tiket<span>Ku</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-tiketku" />

                <Navbar.Collapse id="navbar-tiketku">
                    <Nav className="me-auto gap-lg-3">
                        <Nav.Link as={Link} href="/paket">Paket</Nav.Link>
                        <Nav.Link as={Link} href="/tiket">Penerbangan</Nav.Link>
                        <Nav.Link as={Link} href="/hotel">Hotel</Nav.Link>
                        <Nav.Link as={Link} href="/histori">Pesanan</Nav.Link>
                        <Nav.Link as={Link} href="/favorite">Favorit</Nav.Link>
                        <Nav.Link as={Link} href="/bantuan">Bantuan</Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        {user ? (
                            <>
                                <Link href="/inbox">
                                    <Button variant="secondary">
                                        <i className="bi bi-envelope-fill"></i>
                                    </Button>
                                </Link>

                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        variant="primary"
                                        id="dropdown-profil"
                                        className="rounded-circle p-0 d-flex align-items-center justify-content-center overflow-hidden border-0"
                                        style={{ width: "40px", height: "40px" }}
                                    >
                                        {fotoProfil ? (
                                            <img
                                                src={fotoProfil}
                                                alt="Foto Profil"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <i className="bi bi-person-fill fs-5"></i>
                                        )}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="shadow border-0 rounded-3 mt-2">
                                        <div className="px-3 py-2 border-bottom">
                                            <div className="fw-semibold">{user.nama}</div>
                                            <div className="text-muted small">{user.email}</div>
                                        </div>
                                        <Dropdown.Item as={Link} href="/profil">
                                            <i className="bi bi-person me-2"></i>Profil
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} href="/favorite">
                                            <i className="bi bi-heart me-2"></i>Favorite
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            onClick={handleLogout}
                                            className="text-danger"
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>
                                            Keluar (Logout)
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth?mode=login"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="light">Login</Button>
                                </Link>

                                <Link
                                    href="/auth?mode=register"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="primary">Daftar</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}