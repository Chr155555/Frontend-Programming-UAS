"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: { label?: string; judul?: string; text: string }[];
  after?: string[];
};

const sections: Section[] = [
  {
    id: "pengumpulan-data",
    title: "1. Pengumpulan Data Pribadi",
    paragraphs: [
      "Kami mengumpulkan Data Pribadi yang relevan untuk mendaftarkan, mengelola, dan mengoptimalkan manfaat sistem, program, dan layanan dalam ekosistem Kami, termasuk namun tidak terbatas pada sistem keanggotaan, program loyalitas, pembayaran, teknis, dan layanan lainnya yang Kami sampaikan untuk kepentingan Anda.",
      "Kami dapat memperoleh Data Pribadi Anda baik dari Anda sendiri maupun sumber lainnya yang diperoleh dan dikelola di masing-masing Platforms, seperti mitra bisnis, penyedia layanan logistik, pihak ketiga, mitra pemasaran, program rujukan atau loyalitas, pengguna layanan, atau data dalam domain publik dan pemerintahan.",
      "Dalam beberapa kasus, Anda dapat memberikan Data Pribadi individu lain kepada Kami, seperti anggota keluarga atau teman saat memesan tiket/hotel, dan Anda diharapkan telah mendapatkan persetujuan mereka untuk diproses sesuai peraturan perundang-undangan yang berlaku.",
    ],
  },
  {
    id: "data-anak",
    title: "2. Data Pribadi Anak",
    paragraphs: [
      "Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di bawah umur tanpa pengawasan yang menggunakan Platforms. Kami mengharapkan orang tua atau wali yang sah untuk mengawasi penggunaan layanan dan jika diperlukan memberikan persetujuan atas penggunaan informasi pribadi anak-anak tersebut.",
      "Ketentuan terhadap pemrosesan Data Pribadi anak untuk keperluan manifest penerbangan maupun menginap di hotel akan menyesuaikan dengan kebijakan maskapai, akomodasi, serta setiap Platforms.",
    ],
  },
  {
    id: "dasar-pemrosesan",
    title: "3. Dasar Pemrosesan Data Pribadi",
    paragraphs: [
      "Untuk menjaga kepercayaan Anda, maka Kami hanya memproses Data Pribadi dengan dasar pemrosesan yang sah menurut UU Pelindungan Data Pribadi (UU PDP), meliputi:",
    ],
    items: [
      {
        label: "a.",
        judul: "Persetujuan Anda",
        text: "Anda memberikan persetujuan eksplisit untuk sistem, program, dan layanan Kami.",
      },
      {
        label: "b.",
        judul: "Kepentingan yang Sah",
        text: "Kami menggunakan Data Pribadi untuk meningkatkan sistem, program, dan layanan dengan memberikan pengalaman yang lebih baik kepada Anda. Kami memastikan bahwa kepentingan Kami tidak mengesampingkan hak dan privasi Anda.",
      },
      {
        label: "c.",
        judul: "Kepatuhan Hukum",
        text: "Kami memproses Data Pribadi Anda untuk mematuhi regulasi penerbangan, perhotelan, dan perpajakan yang berlaku.",
      },
      {
        label: "d.",
        judul: "Pemenuhan Kontrak",
        text: "Kami dapat memproses Data Pribadi Anda untuk memenuhi kewajiban kontraktual Kami ketika Anda melakukan transaksi atau pemesanan.",
      },
      {
        label: "e.",
        judul: "Kepentingan Vital",
        text: "Kami dapat memproses Data Pribadi Anda untuk melindungi keselamatan atau kepentingan vital Anda dalam keadaan darurat perjalanan.",
      },
    ],
  },
  {
    id: "tujuan-pengelolaan",
    title: "4. Tujuan Pengelolaan dan Penggunaan Data Pribadi",
    paragraphs: [
      "Informasi dan Data Pribadi yang diperoleh senantiasa Kami kelola sesuai kebutuhan Anda pada masing-masing Platforms dengan mengikuti standar keamanan yang ketat. Adapun data yang Kami peroleh akan digunakan untuk:",
    ],
    items: [
      {
        label: "a.",
        text: "Memproses pemesanan tiket pesawat, reservasi kamar hotel, dan paket wisata beserta penerbitan e-ticket atau voucher resmi.",
      },
      {
        label: "b.",
        text: "Memverifikasi identitas pengguna saat login, pendaftaran, maupun penggabungan akun ekosistem TiketKu.",
      },
      {
        label: "c.",
        text: "Memberikan layanan pelanggan (Customer Care), pengembalian dana (refund), dan penjadwalan ulang (reschedule).",
      },
    ],
  },
  {
    id: "pengungkapan-data",
    title: "5. Pengungkapan Data Pribadi",
    paragraphs: [
      "Kami dapat mengungkapkan Data Pribadi Anda kepada mitra maskapai penerbangan, pihak hotel/akomodasi, penyelenggara tur wisata, serta penyedia gerbang pembayaran (payment gateway) sejauh yang diperlukan untuk menyelesaikan transaksi pesanan Anda.",
      "Seluruh mitra pihak ketiga terikat perjanjian kerahasiaan data dan dilarang menyalahgunakan informasi pribadi Anda di luar konteks pemesanan.",
    ],
  },
  {
    id: "penggunaan-cookie",
    title: "6. Penggunaan Cookie & Teknologi Serupa",
    items: [
      {
        label: "a.",
        text: "Perusahaan dapat menggunakan teknologi seperti cookie, web beacon, atau penyimpanan lokal saat Anda mengakses Platforms Kami. Data yang dikumpulkan digunakan untuk menjaga sesi login, analisis, evaluasi, personalisasi konten, dan penyediaan promo yang relevan.",
      },
      {
        label: "b.",
        text: "Anda dapat mengelola preferensi cookie secara langsung melalui Panel Pengaturan Cookie di halaman ini atau melalui pengaturan peramban Anda.",
      },
      {
        label: "c.",
        text: "Menolak atau membatasi cookie non-esensial tidak akan menghalangi Anda untuk tetap memesan tiket dan hotel di TiketKu.",
      },
    ],
  },
  {
    id: "hak-pemilik-data",
    title: "7. Hak Anda Sebagai Pemilik Data Pribadi",
    paragraphs: [
      "Sebagai subjek data dan pengguna layanan Kami, Anda memiliki hak penuh untuk:",
    ],
    items: [
      {
        label: "a.",
        text: "Mengakses Data Pribadi Anda dan mengunduh salinan informasi terkait Data Pribadi Anda yang Kami simpan.",
      },
      {
        label: "b.",
        text: "Melakukan perubahan, pembaruan, dan perbaikan terhadap Data Pribadi Anda.",
      },
      {
        label: "c.",
        text: "Mengajukan pengakhiran pemrosesan, menghapus, dan/atau memusnahkan Data Pribadi Anda.",
      },
      {
        label: "d.",
        text: "Mengajukan penarikan persetujuan Anda untuk pemrosesan Data Pribadi Anda.",
      },
      {
        label: "e.",
        text: "Mengajukan pembatasan pemrosesan tertentu yang dianggap tidak relevan bagi Anda.",
      },
    ],
    after: [
      "Kami berkomitmen untuk memastikan proses ini berjalan transparan dan sesuai dengan prinsip perlindungan data pribadi serta ketentuan hukum yang berlaku.",
    ],
  },
  {
    id: "penyimpanan-penghapusan",
    title: "8. Penyimpanan, Penarikan Persetujuan, dan Penghapusan",
    paragraphs: [
      "Data Pribadi Anda akan disimpan selama akun TiketKu Anda aktif atau selama diperlukan untuk memenuhi tujuan transaksi dan kewajiban hukum yang berlaku.",
      "Apabila Anda menarik persetujuan atau mengajukan penghapusan akun, Kami akan menghapus atau menganonimkan Data Pribadi Anda dari sistem aktif Kami dalam jangka waktu sesuai ketentuan perundang-undangan.",
    ],
  },
  {
    id: "transfer-data",
    title: "9. Transfer Data Pribadi Lintas Batas",
    paragraphs: [
      "Dalam hal Anda memesan penerbangan internasional, hotel di luar negeri, atau paket wisata mancanegara (seperti Singapura, Jepang, atau Eropa), Data Pribadi Anda dapat ditransfer kepada mitra maskapai atau hotel di negara tujuan tersebut dengan standar perlindungan data yang setara.",
    ],
  },
  {
    id: "keamanan-data",
    title: "10. Keamanan Data Pribadi",
    paragraphs: [
      "Kami menerapkan langkah-langkah keamanan teknis, fisik, dan organisasi seperti enkripsi transmisi SSL/TLS, verifikasi OTP, serta pembatasan akses basis data untuk melindungi Data Pribadi Anda dari akses tidak sah, kebocoran, atau penyalahgunaan.",
    ],
  },
  {
    id: "perubahan-kebijakan",
    title: "11. Perubahan Pada Pemberitahuan Privasi Ini",
    paragraphs: [
      "Pemberitahuan Privasi ini dapat ditinjau dan diperbarui dari waktu ke waktu untuk menyesuaikan dengan perkembangan fitur TiketKu maupun perubahan regulasi pemerintah. Tanggal pembaruan terakhir akan selalu dicantumkan di bagian atas halaman ini.",
    ],
  },
  {
    id: "hukum-bahasa",
    title: "12. Hukum yang Berlaku dan Penggunaan Bahasa",
    paragraphs: [
      "Pemberitahuan Privasi ini diatur dan ditafsirkan berdasarkan Hukum Negara Kesatuan Republik Indonesia (termasuk UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi).",
    ],
  },
  {
    id: "bantuan-lanjut",
    title: "13. Bantuan Lebih Lanjut & Kontak DPO",
    paragraphs: [
      "Apabila Anda memiliki pertanyaan, keluhan, atau ingin menggunakan hak Anda sebagai pemilik Data Pribadi, silakan hubungi Pejabat Pelindung Data Pribadi (Data Protection Officer / DPO) TiketKu melalui email: privacy@tiketku.id atau Pusat Bantuan 24/7 Kami.",
    ],
  },
];

export default function KebijakanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Cookie Preferences state
  const [cookies, setCookies] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: true,
  });
  const [cookieSavedMsg, setCookieSavedMsg] = useState("");

  // Helpful feedback state
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tiketku_cookie_prefs");
      if (saved) {
        setCookies({ ...cookies, ...JSON.parse(saved), essential: true });
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct =
        docHeight > 0
          ? Math.min(100, Math.round((scrollTop / docHeight) * 100))
          : 0;
      setScrollProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter((s) => {
      const inTitle = s.title.toLowerCase().includes(q);
      const inPara = s.paragraphs?.some((p) => p.toLowerCase().includes(q));
      const inItems = s.items?.some(
        (it) =>
          it.text.toLowerCase().includes(q) ||
          (it.judul && it.judul.toLowerCase().includes(q))
      );
      const inAfter = s.after?.some((a) => a.toLowerCase().includes(q));
      return inTitle || inPara || inItems || inAfter;
    });
  }, [searchQuery]);

  const toggleSection = (id: string) => {
    setCollapsedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (collapse: boolean) => {
    const next: Record<string, boolean> = {};
    sections.forEach((s) => {
      next[s.id] = collapse;
    });
    setCollapsedIds(next);
  };

  const handleSaveCookies = () => {
    localStorage.setItem("tiketku_cookie_prefs", JSON.stringify(cookies));
    setCookieSavedMsg("Preferensi Cookie & Privasi berhasil disimpan!");
    setTimeout(() => setCookieSavedMsg(""), 3000);
  };

  const handleDownloadPersonalData = () => {
    const storedUser = localStorage.getItem("tiketku_user");
    const userObj = storedUser
      ? JSON.parse(storedUser)
      : { nama: "Pengguna Tamu", email: "belum-login@tiketku.id" };

    const report = {
      platform: "TiketKu Ecosystem",
      exportedAt: new Date().toISOString(),
      compliance: "UU PDP No. 27 Tahun 2022 - Hak Akses Subjek Data",
      userProfile: userObj,
      cookiePreferences: cookies,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-pribadi-tiketku-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-vh-100 pb-5"
      style={
        {
          backgroundColor: "#f8fafc",
          "--bs-primary": "#0284c7",
          "--bs-primary-rgb": "2, 132, 199",
          "--bs-link-color": "#0284c7",
          "--bs-link-hover-color": "#0369a1",
          "--bs-nav-pills-link-active-bg": "#0284c7",
        } as React.CSSProperties
      }
    >
      {/* Reading Progress Bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1030,
          height: "5px",
          background: "#e2e8f0",
        }}
      >
        <div
          style={{
            width: `${scrollProgress}%`,
            height: "100%",
            background: "#0284c7",
            transition: "width 0.15s ease",
          }}
        />
      </div>

      {/* Hero Header */}
      <div
        className="text-white py-4 mb-4"
        style={{
          background: "#0284c7",
          boxShadow: "0 4px 16px rgba(2, 132, 199, 0.18)",
        }}
      >
        <div className="container" style={{ maxWidth: 1120 }}>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <span className="badge bg-white text-primary fw-bold mb-2 px-3 py-2 rounded-pill">
                <i className="bi bi-shield-check me-1"></i> Pusat Privasi &amp;
                Pelindungan Data
              </span>
              <h1 className="fw-bold mb-2">Pemberitahuan Privasi TiketKu</h1>
              <p className="mb-0 text-white-50 small">
                Berlaku Efektif: 27 November 2026 • Versi 3.2 (Kepatuhan UU PDP
                Indonesia) • Progres Baca:{" "}
                <strong className="text-white">{scrollProgress}%</strong>
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link
                href="/syarat"
                className="btn btn-light btn-sm fw-semibold text-primary"
              >
                Lihat Syarat &amp; Ketentuan{" "}
                <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container" style={{ maxWidth: 1120 }}>
        <div className="row g-4">
          {/* Sticky Sidebar Daftar Isi */}
          <aside className="col-lg-4">
            <div className="sticky-top" style={{ top: "1.5rem" }}>
              <div className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body p-3">
                  <label className="form-label fw-bold small text-uppercase text-muted mb-2">
                    <i className="bi bi-search me-1"></i> Cari Pasal / Topik
                    Privasi
                  </label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ketik misal: cookie, anak, hapus..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setSearchQuery("")}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center small text-muted">
                    <span>
                      Menampilkan {filteredSections.length} dari{" "}
                      {sections.length} bab
                    </span>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 me-2 text-decoration-none"
                        onClick={() => toggleAll(false)}
                      >
                        Buka Semua
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-decoration-none"
                        onClick={() => toggleAll(true)}
                      >
                        Tutup Semua
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-2 text-primary">
                    <i className="bi bi-list-ul me-1"></i> Daftar Isi (
                    {sections.length} Bab)
                  </h6>
                  <div
                    className="d-flex flex-column gap-1"
                    style={{ maxHeight: "380px", overflowY: "auto" }}
                  >
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={() => setActiveId(s.id)}
                        className={`py-2 px-3 rounded-3 small text-start text-decoration-none ${
                          activeId === s.id
                            ? "text-white fw-semibold"
                            : "text-dark bg-light"
                        }`}
                        style={{
                          backgroundColor:
                            activeId === s.id ? "#0284c7" : undefined,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          lineHeight: 1.35,
                        }}
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Document & Interactive Privacy Tools */}
          <div className="col-lg-8">
            {/* Pengantar */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <p className="mb-2">
                  Selamat datang di situs <strong>TiketKu</strong>.
                </p>
                <p className="mb-2 text-secondary small">
                  {`Situs ini dioperasikan oleh TiketKu ("TiketKu", "Perusahaan", atau "Kami"). Kami mengoperasikan situs web dan layanan yang tersedia secara online melalui ekosistem account.bliblitiket.com untuk web, iOS, dan Android.`}
                </p>
                <p className="mb-0 text-secondary small">
                  {`Di TiketKu, privasi Anda dan perlindungan data pribadi Anda merupakan hal yang sangat penting bagi Kami. Pemberitahuan Privasi ini menjelaskan bagaimana Kami mengumpulkan, menggunakan, menyimpan, dan melindungi Data Pribadi Anda di seluruh platform yang tergabung.`}
                </p>
              </div>
            </div>

            {/* Panel Interaktif Preferensi Cookie & Hak Subjek Data */}
            <div className="card border-primary border-opacity-25 shadow-sm rounded-4 mb-4 bg-white">
              <div className="card-body p-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                  <div>
                    <h5 className="fw-bold mb-1 text-primary">
                      <i className="bi bi-sliders me-2"></i>Pusat Kontrol
                      Privasi &amp; Cookie Anda
                    </h5>
                    <p className="text-muted small mb-0">
                      Sesuai Bab 6 &amp; Bab 7, kelola izin penggunaan cookie
                      atau unduh salinan Data Pribadi Anda secara langsung.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadPersonalData}
                    className="btn btn-outline-primary btn-sm fw-semibold"
                  >
                    <i className="bi bi-download me-1"></i> Unduh Data Saya
                    (JSON)
                  </button>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <div className="p-2 border rounded-3 d-flex justify-content-between align-items-center bg-light">
                      <div>
                        <div className="fw-semibold small">
                          Cookie Esensial (Wajib)
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Sesi login, keamanan OTP &amp; keranjang booking
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={cookies.essential}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-2 border rounded-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold small">
                          Cookie Analitik Performa
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Membantu peningkatan kecepatan pencarian tiket
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={cookies.analytics}
                          onChange={(e) =>
                            setCookies({
                              ...cookies,
                              analytics: e.target.checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-2 border rounded-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold small">
                          Personalisasi Destinasi
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Rekomendasi hotel &amp; rute sesuai riwayat Anda
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={cookies.personalization}
                          onChange={(e) =>
                            setCookies({
                              ...cookies,
                              personalization: e.target.checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-2 border rounded-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold small">
                          Cookie Iklan &amp; Promo Mitra
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Menampilkan penawaran eksklusif ekosistem
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={cookies.marketing}
                          onChange={(e) =>
                            setCookies({
                              ...cookies,
                              marketing: e.target.checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <button
                    type="button"
                    onClick={handleSaveCookies}
                    className="btn btn-sm fw-semibold text-white"
                    style={{
                      backgroundColor: "#0284c7",
                      borderColor: "#0284c7",
                    }}
                  >
                    <i className="bi bi-check2-circle me-1"></i> Simpan
                    Preferensi Privasi
                  </button>
                  {cookieSavedMsg && (
                    <span className="text-success small fw-semibold">
                      <i className="bi bi-check-circle-fill me-1"></i>
                      {cookieSavedMsg}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Daftar Pasal Kebijakan */}
            {filteredSections.length === 0 ? (
              <div className="alert alert-warning rounded-4">
                Tidak ditemukan bab kebijakan dengan kata kunci{" "}
                <strong>&ldquo;{searchQuery}&rdquo;</strong>.
              </div>
            ) : (
              filteredSections.map((s) => {
                const isCollapsed = !!collapsedIds[s.id];
                return (
                  <section
                    key={s.id}
                    id={s.id}
                    className="card border-0 shadow-sm rounded-4 mb-3"
                  >
                    <div
                      className="card-header bg-white border-0 p-3 d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSection(s.id)}
                    >
                      <h2 className="h6 fw-bold text-uppercase mb-0 text-primary">
                        {s.title}
                      </h2>
                      <i
                        className={`bi ${
                          isCollapsed ? "bi-chevron-down" : "bi-chevron-up"
                        } text-muted`}
                      ></i>
                    </div>

                    {!isCollapsed && (
                      <div className="card-body pt-0 px-3 pb-3 text-secondary">
                        {s.paragraphs?.map((p) => (
                          <p key={p} className="mb-2">
                            {p}
                          </p>
                        ))}
                        {s.items?.map((it) => (
                          <div key={it.text} className="d-flex gap-2 mb-2">
                            {it.label && (
                              <strong className="flex-shrink-0 text-dark">
                                {it.label}
                              </strong>
                            )}
                            <div>
                              {it.judul && (
                                <strong className="d-block text-dark">
                                  {it.judul}
                                </strong>
                              )}
                              <p className="mb-0">{it.text}</p>
                            </div>
                          </div>
                        ))}
                        {s.after?.map((p) => (
                          <p key={p} className="mt-2 mb-0 fst-italic small">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })
            )}

            {/* Widget Feedback Dokumen */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
              <div className="card-body p-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div>
                  <h6 className="fw-bold mb-1">
                    Apakah Pemberitahuan Privasi ini jelas &amp; membantu?
                  </h6>
                  <p className="text-muted small mb-0">
                    Masukan Anda membantu tim kepatuhan hukum TiketKu
                    menyempurnakan transparansi data.
                  </p>
                </div>
                {feedback ? (
                  <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                    <i className="bi bi-heart-fill me-1"></i> Terima kasih atas
                    tanggapan Anda!
                  </span>
                ) : (
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => setFeedback("yes")}
                    >
                      <i className="bi bi-hand-thumbs-up me-1"></i> Ya, Jelas
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setFeedback("no")}
                    >
                      <i className="bi bi-hand-thumbs-down me-1"></i> Kurang
                      Jelas
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
