"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./auth.module.css";

type Mode = "login" | "register";

function AuthForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasi: "",
  });
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && form.password !== form.konfirmasi) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setError("");
    alert(isLogin ? "Login berhasil (demo)" : "Akun berhasil dibuat (demo)");
  };

  return (
    <main className={styles.wrapper}>
      <Link href="/" className={styles.back}>
        ← Kembali ke beranda
      </Link>
      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? "Selamat Datang" : "Buat Akun Baru"}</h1>
        <p className={styles.subtitle}>
          {isLogin ? "Masuk untuk melanjutkan pemesanan" : "Daftar untuk mulai memesan tiket"}
        </p>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${isLogin ? styles.tabActive : ""}`}
            onClick={() => switchMode("login")}
          >
            Masuk
          </button>
          <button
            type="button"
            className={`${styles.tab} ${!isLogin ? styles.tabActive : ""}`}
            onClick={() => switchMode("register")}
          >
            Daftar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">Nama Lengkap</label>
              <input
                id="nama"
                name="nama"
                type="text"
                className="form-control"
                placeholder="Nama lengkap"
                value={form.nama}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Minimal 6 karakter"
              minLength={6}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="konfirmasi" className="form-label">Konfirmasi Password</label>
              <input
                id="konfirmasi"
                name="konfirmasi"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Ulangi password"
                value={form.konfirmasi}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-check mb-3">
            <input
              id="show"
              type="checkbox"
              className="form-check-input"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="show" className="form-check-label">Tampilkan password</label>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className={styles.submit}>
            {isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>

        <p className={styles.switch}>
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button
            type="button"
            className={styles.link}
            onClick={() => switchMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "Daftar" : "Masuk"}
          </button>
        </p>

        <p className={styles.terms}>
          Dengan melanjutkan, kamu menyetujui{" "}
          <Link href="/kebijakan">Kebijakan Privasi</Link> dan{" "}
          <Link href="#">Syarat &amp; Ketentuan</Link> TiketKu.
        </p>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}
