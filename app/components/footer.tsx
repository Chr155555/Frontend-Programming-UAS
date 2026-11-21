"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer id="footer" className="pt-md-5 pb-md-2 py-3 bg-light">
      <Container>
        <Row>
            <Col md={3}>
                <h2 id="logo">Tiket<span>Ku</span></h2>
                <ul className="list-unstyled d-flex flex-column">
                    <li className="mb-2">Email: cs@tiketku.id</li>
                    <li className="mb-2">Call Center: +62 ### #### ####</li>
                </ul>
            </Col>
            <Col md={3}>
                <h3>Produk</h3>
                <ul className="list-unstyled d-flex flex-column">
                    <li className="mb-2"><Link href="/paket">Paket Liburan</Link></li>
                    <li className="mb-2"><Link href="/tiket">Tiket Pesawat</Link></li>
                    <li className="mb-2"><Link href="/hotel">Hotel</Link></li>
                </ul>
            </Col>

            <Col md={3}>
                <h3>Dukungan</h3>
                <ul className="list-unstyled d-flex flex-column">
                    <li className="mb-2"><Link href="/syarat">Syarat dan Ketentuan</Link></li>
                    <li className="mb-2"><Link href="/kebijakan">Kebijakan Privasi</Link></li>
                    <li className="mb-2"><Link href="/bantuan">Bantuan</Link></li>
                </ul>
            </Col>
            <Col md={3}>
                <h3>Ikuti Kami</h3>
                <ul className="list-unstyled d-flex gap-3">
                    <li><Link href="#"><i className="bi bi-facebook fs-4"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-twitter fs-4"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-instagram fs-4"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-youtube fs-4"></i></Link></li>
                </ul>
            </Col>
        </Row>

        <Row className="mt-3">
          <Col md={12} className="text-center">
            <hr />
            <p className="mb-0">
                &copy; 2026 Tiketku. All Rights Reserved. Project UAS Front-End Programming.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}