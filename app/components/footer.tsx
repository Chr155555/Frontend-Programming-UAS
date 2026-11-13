"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

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
                    <li className="mb-2"><a href="#"></a></li>
                    <li className="mb-2"><a href="#">Paket Liburan</a></li>
                    <li className="mb-2"><a href="/tiket">Tiket Pesawat</a></li>
                    <li className="mb-2"><a href="/hotel">Hotel</a></li>
                </ul>
            </Col>

            <Col md={3}>
                <h3>Dukungan</h3>
                <ul className="list-unstyled d-flex flex-column">
                    <li className="mb-2"><a href="/syarat">Syarat dan Ketentuan</a></li>
                    <li className="mb-2"><a href="/kebijakan">Kebijakan Privasi</a></li>
                    <li className="mb-2"><a href="#">Bantuan</a></li>
                </ul>
            </Col>
            <Col md={3}>
                <h3>Ikuti Kami</h3>
                <ul className="list-unstyled d-flex gap-3">
                    <li><a href="#"><i className="bi bi-facebook fs-4"></i></a></li>
                    <li><a href="#"><i className="bi bi-twitter fs-4"></i></a></li>
                    <li><a href="#"><i className="bi bi-instagram fs-4"></i></a></li>
                    <li><a href="#"><i className="bi bi-youtube fs-4"></i></a></li>
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