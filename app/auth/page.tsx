"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./auth.module.css";

type Mode = "login" | "register";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasi: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLogin = mode === "login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLogin && form.password !== form.konfirmasi) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { nama: form.nama, email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan.");
        return;
      }

      if (data.user) {
        localStorage.setItem("tiketku_user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("tiketku-auth-change"));
      }

      setSuccess(
        isLogin
          ? "Login berhasil! Mengalihkan ke beranda..."
          : "Akun berhasil dibuat & masuk! Mengalihkan ke beranda..."
      );

      setTimeout(() => {
        router.push("/");
      }, 600);
    } catch {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
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
          {success && <div className="alert alert-success py-2">{success}</div>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
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
          <Link href="/syarat">Syarat &amp; Ketentuan</Link> TiketKu.
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
