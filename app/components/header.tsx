"use client";

import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar expand="lg" className="bg-light shadow-sm py-2">
            <Container fluid>
                <Navbar.Brand as={Link} href="/" id="logo" className="me-lg-5">
                    Tiket<span>Ku</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-tiketku" />

                <Navbar.Collapse id="navbar-tiketku">
                    <Nav className="me-auto gap-lg-3">
                        <Nav.Link as={Link} href="/paket">
                            Paket
                        </Nav.Link>
                        <Nav.Link as={Link} href="/tiket">
                            Penerbangan
                        </Nav.Link>
                        <Nav.Link as={Link} href="/hotel">
                            Hotel
                        </Nav.Link>
                        <Nav.Link as={Link} href="/">
                            Pesanan
                        </Nav.Link>
                        <Nav.Link as={Link} href="/favorite">
                            Favorit
                        </Nav.Link>
                        <Nav.Link as={Link} href="/">
                            Bantuan
                        </Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        <Button variant="secondary">
                            <i className="bi bi-envelope-fill"></i>
                        </Button>

                        <Dropdown align="end">
                            <Dropdown.Toggle
                                variant="primary"
                                id="dropdown-profil"
                            >
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
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Keluar (Logout)
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Link
                            href="/auth?mode=register"
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
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
