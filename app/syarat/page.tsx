"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

type SubItem = {
  label: string;
  text: string;
};

type NumberedItem = {
  num: string;
  text: string;
  subItems?: SubItem[];
};

type Section = {
  id: string;
  title: string;
  badge: string;
  items: NumberedItem[];
};

const sections: Section[] = [
  {
    id: "akun-tiketku",
    title: "Bab 1 — Ketentuan Akun TiketKu",
    badge: "9 Pasal",
    items: [
      {
        num: "1.",
        text: "Akun TiketKu adalah akun milik Pengguna yang telah terdaftar atau akan terdaftar dan dapat diakses melalui masing-masing Situs Perusahaan.",
      },
      {
        num: "2.",
        text: "Pengguna dapat melakukan pendaftaran Akun TiketKu melalui salah satu dari entitas Blibli, tiket.com, maupun Ranch dan akun dapat digunakan di masing-masing Situs Perusahaan.",
      },
      {
        num: "3.",
        text: "Untuk setiap pembukaan dan pendaftaran Akun TiketKu, Perusahaan akan mengumpulkan dan memproses informasi pribadi Pengguna, seperti nama lengkap, nomor telepon, e-mail, tanggal lahir, dan juga negara tempat tinggal.",
      },
      {
        num: "4.",
        text: "Mengubah nama lengkap, nomor telepon, e-mail, dan tanggal lahir di salah satu Situs Perusahaan akan secara otomatis memperbarui detail tersebut di seluruh Situs Perusahaan.",
      },
      {
        num: "5.",
        text: "Pengguna dapat menghapus Akun TiketKu dengan melakukan penghapusan akun melalui salah satu Situs Perusahaan.",
      },
      {
        num: "6.",
        text: "Perusahaan berhak sepenuhnya untuk sementara memblokir, menghapus, atau menonaktifkan akun Pengguna atas kebijakan Perusahaan sendiri dan untuk alasan apapun tanpa memberikan alasan atau tanpa memberikan pemberitahuan. Alasan pemblokiran, penghapusan, atau penonaktifan akun Pengguna dapat termasuk tetapi tidak terbatas pada:",
        subItems: [
          { label: "a.", text: "Pelanggaran ketentuan ini," },
          { label: "b.", text: "Larangan dalam peraturan," },
          {
            label: "c.",
            text: "Penipuan atau pencurian (termasuk indikasi atau dugaan adanya penipuan atau pencurian), kecurigaan aktivitas kriminal,",
          },
          { label: "d.", text: "Pemesanan yang mencurigakan," },
          {
            label: "e.",
            text: "Pemberian informasi yang tidak akurat, salah atau menyesatkan,",
          },
          {
            label: "f.",
            text: "Perilaku, ancaman, atau penghinaan yang tidak pantas,",
          },
          { label: "g.", text: "Penolakan untuk memberikan informasi," },
          { label: "h.", text: "Sulit dihubungi/dijangkau, atau" },
          {
            label: "i.",
            text: 'Pengguna terdaftar pada "daftar hitam" atau "daftar pantauan" oleh pemerintah atau organisasi internasional.',
          },
        ],
      },
      {
        num: "7.",
        text: "Pengguna setuju bahwa segala risiko dan akibat dari pemblokiran, penghapusan, atau penonaktifan akun Pengguna akan menjadi risiko Pengguna. Perusahaan berhak untuk mengambil semua tindakan yang diperlukan untuk mengurangi risiko dan/atau kerugian Perusahaan.",
      },
      {
        num: "8.",
        text: "Dengan memiliki Akun TiketKu, Pengguna dengan ini setuju untuk menanggung sendiri tanggung jawab, kerugian dan/atau risiko yang timbul dari penggunaan Akun TiketKu.",
      },
      {
        num: "9.",
        text: "Perusahaan atas kebijakannya sendiri dapat mematikan fitur ini kapan saja tanpa pemberitahuan terlebih dahulu dengan alasan yang dianggap perlu oleh Perusahaan, termasuk namun tidak terbatas pada pemeliharaan atau peningkatan sistem.",
      },
    ],
  },
  {
    id: "penggabungan-akun",
    title: "Bab 2 — Penggabungan Akun TiketKu (Single Sign-On)",
    badge: "2 Pasal Utama",
    items: [
      {
        num: "1.",
        text: "Penggabungan Akun TiketKu akan dilakukan dengan cara sebagai berikut:",
        subItems: [
          {
            label: "a.",
            text: "Penggabungan Akun yang sudah terdaftar di masing-masing Situs Perusahaan: Akun yang sudah terdaftar di masing-masing Situs Perusahaan dan memiliki 1 (Satu) nomor telepon terverifikasi yang sama akan otomatis tergabung menjadi 1 (Satu) Akun TiketKu.",
          },
          {
            label: "b.",
            text: "Penggabungan Akun yang memiliki alamat e-mail terverifikasi yang sama: Akun Blibli, Akun Tiket.com, dan Akun Ranch yang memiliki alamat e-mail terverifikasi yang sama akan tergabung menjadi 1 (Satu) Akun TiketKu. Apabila terdapat perbedaan nomor telepon, Pelanggan harus memverifikasi ulang nomor telepon di Akun TiketKu ketika melakukan login di Situs Perusahaan.",
          },
          {
            label: "c.",
            text: "Akun Blibli, Akun tiket.com, dan Akun Ranch yang tidak terverifikasi nomor telepon dan alamat e-mail nya tidak akan diproses untuk penggabungan Akun TiketKu.",
          },
        ],
      },
      {
        num: "2.",
        text: "Bila Pengguna tidak setuju atas penggabungan Akun TiketKu, maka:",
        subItems: [
          {
            label: "a.",
            text: "Bagi Pengguna yang belum terdaftar pada Situs Perusahaan, Pengguna dapat menghentikan dan tidak melanjutkan proses registrasi Akun TiketKu; atau",
          },
          {
            label: "b.",
            text: "Bagi Pengguna yang telah terdaftar pada masing-masing Situs Perusahaan maka Pengguna dapat melakukan penghapusan Akun Blibli, Akun tiket.com, dan Akun Ranch secara terpisah sebelum penggabungan Akun TiketKu dilakukan.",
          },
        ],
      },
    ],
  },
  {
    id: "pemesanan-pembayaran",
    title: "Bab 3 — Ketentuan Transaksi, Pembatalan & Pengembalian Dana",
    badge: "4 Pasal",
    items: [
      {
        num: "1.",
        text: "Setiap pemesanan tiket pesawat, hotel, maupun paket wisata yang dilakukan melalui Akun TiketKu bersifat mengikat setelah pembayaran terverifikasi oleh sistem.",
      },
      {
        num: "2.",
        text: "Harga yang tertera pada halaman pembayaran akhir sudah mencakup pajak dan biaya layanan yang berlaku kecuali dinyatakan lain pada rincian kamar atau maskapai.",
      },
      {
        num: "3.",
        text: "Pengajuan pembatalan (refund) atau perubahan jadwal (reschedule) tunduk pada kebijakan masing-masing maskapai penerbangan dan mitra properti hotel yang dipilih oleh Pengguna.",
      },
      {
        num: "4.",
        text: "Penyalahgunaan kode promo atau manipulasi transaksi akan mengakibatkan pembatalan pesanan secara sepihak sesuai Bab 1 Pasal 6.",
      },
    ],
  },
  {
    id: "lain-lain",
    title: "Bab 4 — Hukum yang Berlaku & Ketentuan Lain-Lain",
    badge: "3 Pasal",
    items: [
      {
        num: "1.",
        text: "Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan Hukum Indonesia. Segala perselisihan yang mungkin timbul antara Pengguna dengan Perusahaan sehubungan dengan penggabungan Akun TiketKu ini akan diselesaikan secara eksklusif dalam yurisdiksi pengadilan Republik Indonesia.",
      },
      {
        num: "2.",
        text: "Pengguna dapat menyampaikan pertanyaan, komentar, atau keperluan lainnya sehubungan dengan penggabungan Akun TiketKu ini dengan cara menghubungi Customer Care dari masing-masing entitas Perusahaan.",
      },
      {
        num: "3.",
        text: "Syarat dan Ketentuan ini mungkin dapat diubah dan/atau diperbaharui setiap waktu tanpa adanya pemberitahuan kepada Pengguna dan akan segera berlaku setelah dicantumkan di masing-masing Situs Perusahaan. Dengan tetap mengakses dan menggunakan Situs Perusahaan, Pengguna setuju atas perubahan-perubahan dalam Syarat dan Ketentuan ini.",
      },
    ],
  },
];

export default function SyaratPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive simulator for Bab 2 (Penggabungan Akun TiketKu)
  const [emailVerified, setEmailVerified] = useState(true);
  const [phoneSame, setPhoneSame] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "TiketKu / tiket.com",
    "Blibli",
  ]);

  // Digital acceptance state
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tiketku_terms_accepted_at");
      if (saved) setAcceptedAt(saved);
    } catch {
      // ignore
    }
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
      const inItems = s.items.some(
        (it) =>
          it.text.toLowerCase().includes(q) ||
          it.subItems?.some((sub) => sub.text.toLowerCase().includes(q))
      );
      return inTitle || inItems;
    });
  }, [searchQuery]);

  const togglePlatform = (name: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const mergeResult = useMemo(() => {
    if (selectedPlatforms.length < 2) {
      return {
        status: "warning",
        title: "Pilih Minimal 2 Platform Ekosistem",
        desc: "Pilih minimal 2 platform (Blibli, tiket.com, atau Ranch) untuk mensimulasikan aturan penggabungan akun.",
      };
    }
    if (!emailVerified && !phoneSame) {
      return {
        status: "danger",
        title: "Tidak Dapat Digabungkan (Sesuai Bab 2 Pasal 1c)",
        desc: "Akun yang belum terverifikasi nomor telepon dan alamat e-mail-nya tidak akan diproses untuk penggabungan Akun TiketKu.",
      };
    }
    if (phoneSame && emailVerified) {
      return {
        status: "success",
        title: "Otomatis Tergabung Penuh (Sesuai Bab 2 Pasal 1a & 1b)",
        desc: `Akun Anda di ${selectedPlatforms.join(
          ", "
        )} memiliki nomor telepon & email terverifikasi yang sama sehingga otomatis menjadi 1 Akun TiketKu tanpa verifikasi ulang.`,
      };
    }
    return {
      status: "info",
      title:
        "Tergabung dengan Verifikasi Ulang Nomor Telepon (Sesuai Bab 2 Pasal 1b)",
      desc: "Karena email terverifikasi sama namun terdapat perbedaan nomor telepon, akun tetap digabungkan tetapi Anda wajib memverifikasi ulang nomor telepon via OTP saat login.",
    };
  }, [selectedPlatforms, emailVerified, phoneSame]);

  const handleAcceptTerms = () => {
    const timestamp = new Date().toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
    localStorage.setItem("tiketku_terms_accepted_at", timestamp);
    setAcceptedAt(timestamp);
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

      {/* Hero Banner */}
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
                <i className="bi bi-file-earmark-text-fill me-1"></i> Dokumen
                Legal &amp; Kepatuhan Pengguna
              </span>
              <h1 className="fw-bold mb-2">
                Syarat dan Ketentuan Penggabungan Akun TiketKu
              </h1>
              <p className="mb-0 text-white-50 small">
                Ekosistem Blibli • tiket.com • Ranch Market • Progres Baca:{" "}
                <strong className="text-white">{scrollProgress}%</strong>
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link
                href="/kebijakan"
                className="btn btn-light btn-sm fw-semibold text-primary"
              >
                <i className="bi bi-shield-lock me-1"></i> Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container" style={{ maxWidth: 1120 }}>
        <div className="row g-4">
          {/* Sticky Sidebar */}
          <aside className="col-lg-4">
            <div className="sticky-top" style={{ top: "1.5rem" }}>
              <div className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body p-3">
                  <label className="form-label fw-bold small text-uppercase text-muted mb-2">
                    <i className="bi bi-search me-1"></i> Cari Pasal Ketentuan
                  </label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ketik misal: blokir, telepon, hukum..."
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
                  <div className="small text-muted">
                    Menampilkan {filteredSections.length} dari {sections.length}{" "}
                    bab
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-2 text-primary">
                    <i className="bi bi-journal-bookmark-fill me-1"></i>{" "}
                    Navigasi Bab
                  </h6>
                  <div className="d-flex flex-column gap-1">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={() => setActiveId(s.id)}
                        className={`py-2 px-3 rounded-3 small d-flex justify-content-between align-items-center text-decoration-none ${
                          activeId === s.id
                            ? "text-white fw-semibold"
                            : "text-dark bg-light"
                        }`}
                        style={{
                          backgroundColor:
                            activeId === s.id ? "#0284c7" : undefined,
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        <span
                          className="me-2"
                          style={{
                            flex: 1,
                            minWidth: 0,
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: 1.35,
                          }}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`badge rounded-pill flex-shrink-0 ${
                            activeId === s.id
                              ? "bg-white text-primary"
                              : "bg-white text-secondary border"
                          }`}
                        >
                          {s.badge}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Persetujuan Digital */}
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-patch-check-fill text-primary me-1"></i>{" "}
                    Status Persetujuan Anda
                  </h6>
                  {acceptedAt ? (
                    <div className="alert alert-success py-2 px-3 mb-2 small">
                      <div className="fw-bold">
                        <i className="bi bi-check-circle-fill me-1"></i> Telah
                        Disetujui
                      </div>
                      <div style={{ fontSize: "0.78rem" }}>
                        Pada: {acceptedAt}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted small mb-2">
                      Anda belum menandai persetujuan digital pada perangkat
                      ini.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleAcceptTerms}
                    className="btn btn-sm w-100 fw-semibold text-white"
                    style={{
                      backgroundColor: "#0284c7",
                      borderColor: "#0284c7",
                    }}
                  >
                    <i className="bi bi-pen me-1"></i>{" "}
                    {acceptedAt
                      ? "Perbarui Persetujuan"
                      : "Setujui Syarat & Ketentuan"}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="col-lg-8">
            {/* Pengantar Resmi */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <p className="mb-2 small text-secondary">
                  {`Syarat dan Ketentuan Penggabungan Akun TiketKu ("Syarat dan Ketentuan") berlaku bagi pengguna sebagai pihak yang menggunakan layanan Perusahaan ("Pengguna"), yang disediakan oleh PT Global Digital Niaga Tbk. ("Blibli"), PT Global Tiket Network ("tiket.com"), PT Supra Boga Lestari Tbk. ("Ranch"), dan atau Blibli Group lainnya di kemudian hari. Seluruhnya Blibli, tiket.com, dan Ranch disebut sebagai "Perusahaan".`}
                </p>
                <p className="mb-0 small text-secondary">
                  {`Pengguna harap membaca dengan hati-hati Syarat dan Ketentuan ini. Pengguna wajib membaca, memahami, menerima dan menyetujui Syarat dan Ketentuan ini sebelum melanjutkan proses penggabungan Akun TiketKu.`}
                </p>
              </div>
            </div>

            {/* Simulator Interaktif Cek Kelayakan Penggabungan Akun */}
            <div className="card border-primary border-opacity-25 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h5 className="fw-bold text-primary mb-0">
                    <i className="bi bi-diagram-3-fill me-2"></i>Simulator Cek
                    Penggabungan Akun TiketKu
                  </h5>
                </div>
                <p className="text-muted small mb-3">
                  Cek bagaimana aturan{" "}
                  <strong>Bab 2 (Penggabungan Akun)</strong> berlaku pada akun
                  Anda berdasarkan status verifikasi email dan nomor telepon:
                </p>

                <div className="mb-3">
                  <label className="form-label small fw-bold mb-1">
                    1. Pilih Platform Tempat Anda Memiliki Akun:
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {["TiketKu / tiket.com", "Blibli", "Ranch Market"].map(
                      (plat) => {
                        const active = selectedPlatforms.includes(plat);
                        return (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => togglePlatform(plat)}
                            className={`btn btn-sm ${
                              active ? "text-white" : "btn-outline-secondary"
                            }`}
                            style={
                              active
                                ? {
                                    backgroundColor: "#0284c7",
                                    borderColor: "#0284c7",
                                  }
                                : undefined
                            }
                          >
                            <i
                              className={`bi ${
                                active ? "bi-check-square-fill" : "bi-square"
                              } me-1`}
                            ></i>
                            {plat}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <div className="p-2 border rounded-3 d-flex justify-content-between align-items-center">
                      <span className="small fw-semibold">
                        Email Sama &amp; Terverifikasi?
                      </span>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={emailVerified}
                          onChange={(e) => setEmailVerified(e.target.checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-2 border rounded-3 d-flex justify-content-between align-items-center">
                      <span className="small fw-semibold">
                        Nomor HP Sama &amp; Terverifikasi?
                      </span>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={phoneSame}
                          onChange={(e) => setPhoneSame(e.target.checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`alert alert-${mergeResult.status} mb-0 py-2 px-3`}
                >
                  <div className="fw-bold small">{mergeResult.title}</div>
                  <div className="small">{mergeResult.desc}</div>
                </div>
              </div>
            </div>

            {/* Daftar Pasal Syarat & Ketentuan */}
            {filteredSections.length === 0 ? (
              <div className="alert alert-warning rounded-4">
                Tidak ditemukan pasal dengan kata kunci{" "}
                <strong>&ldquo;{searchQuery}&rdquo;</strong>.
              </div>
            ) : (
              filteredSections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="card border-0 shadow-sm rounded-4 mb-4"
                >
                  <div className="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
                    <h2 className="h6 fw-bold mb-0 text-primary">{s.title}</h2>
                    <span className="badge bg-light text-secondary">
                      {s.badge}
                    </span>
                  </div>
                  <div className="card-body p-4">
                    {s.items.map((item) => (
                      <div key={item.num} className="mb-3">
                        <div className="d-flex gap-2">
                          <strong className="flex-shrink-0 text-primary">
                            {item.num}
                          </strong>
                          <div className="flex-grow-1">
                            <p className="mb-1 text-dark">{item.text}</p>
                            {item.subItems && (
                              <div className="ps-2 border-start border-2 border-primary-subtle mt-2">
                                {item.subItems.map((sub) => (
                                  <div
                                    key={sub.label}
                                    className="d-flex gap-2 mb-1"
                                  >
                                    <strong className="flex-shrink-0 text-secondary small">
                                      {sub.label}
                                    </strong>
                                    <p className="mb-0 text-secondary small">
                                      {sub.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
