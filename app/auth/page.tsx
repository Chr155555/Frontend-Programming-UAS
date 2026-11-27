"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./auth.module.css";

type Mode = "login" | "register" | "forgot";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode");
  const [mode, setMode] = useState<Mode>(
    initialMode === "register"
      ? "register"
      : initialMode === "forgot"
      ? "forgot"
      : "login"
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
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  const passwordChecks = useMemo(() => {
    const pwd = form.password;
    return {
      minLength: pwd.length >= 6,
      hasUpper: /[A-Z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSymbol: /[^A-Za-z0-9]/.test(pwd) || pwd.length >= 10,
    };
  }, [form.password]);

  const strengthScore = useMemo(() => {
    return Object.values(passwordChecks).filter(Boolean).length;
  }, [passwordChecks]);

  const strengthInfo = useMemo(() => {
    if (!form.password)
      return { label: "Belum diisi", color: "#94a3b8", percent: 0 };
    if (strengthScore <= 1)
      return { label: "Lemah", color: "#dc3545", percent: 25 };
    if (strengthScore === 2)
      return { label: "Cukup", color: "#fd7e14", percent: 55 };
    if (strengthScore === 3)
      return { label: "Kuat", color: "#0284c7", percent: 80 };
    return { label: "Sangat Kuat", color: "#059669", percent: 100 };
  }, [form.password, strengthScore]);

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
      if (isForgot) {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            newPassword: form.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal mengatur ulang password.");
          return;
        }
        setSuccess(
          data.message || "Password berhasil diperbarui! Silakan masuk."
        );
        setTimeout(() => {
          switchMode("login");
        }, 1000);
        return;
      }

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
        <h1 className={styles.title}>
          {isLogin
            ? "Selamat Datang"
            : isRegister
            ? "Buat Akun Baru"
            : "Atur Ulang Password"}
        </h1>
        <p className={styles.subtitle}>
          {isLogin
            ? "Masuk untuk melanjutkan pemesanan"
            : isRegister
            ? "Daftar untuk mulai memesan tiket"
            : "Masukkan email terdaftar dan buat password baru"}
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
            className={`${styles.tab} ${isRegister ? styles.tabActive : ""}`}
            onClick={() => switchMode("register")}
          >
            Daftar
          </button>
          <button
            type="button"
            className={`${styles.tab} ${isForgot ? styles.tabActive : ""}`}
            onClick={() => switchMode("forgot")}
          >
            Reset
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama Lengkap
              </label>
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              {isForgot ? "Password Baru" : "Password"}
            </label>
            <div className={styles.inputGroup}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Minimal 6 karakter"
                minLength={6}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  }`}
                ></i>
              </button>
            </div>

            {!isLogin && (
              <div className={styles.strengthBox}>
                <div className={styles.strengthHeader}>
                  <span>Kekuatan Password:</span>
                  <span style={{ color: strengthInfo.color }}>
                    {strengthInfo.label}
                  </span>
                </div>
                <div className={styles.strengthBarBg}>
                  <div
                    className={styles.strengthBarFill}
                    style={{
                      width: `${strengthInfo.percent}%`,
                      backgroundColor: strengthInfo.color,
                    }}
                  />
                </div>
                <div className={styles.criteriaList}>
                  <span
                    className={
                      passwordChecks.minLength ? styles.criteriaMet : ""
                    }
                  >
                    <i
                      className={`bi ${
                        passwordChecks.minLength
                          ? "bi-check-circle-fill"
                          : "bi-circle"
                      } me-1`}
                    ></i>
                    Min. 6 karakter
                  </span>
                  <span
                    className={
                      passwordChecks.hasUpper ? styles.criteriaMet : ""
                    }
                  >
                    <i
                      className={`bi ${
                        passwordChecks.hasUpper
                          ? "bi-check-circle-fill"
                          : "bi-circle"
                      } me-1`}
                    ></i>
                    Huruf kapital (A-Z)
                  </span>
                  <span
                    className={
                      passwordChecks.hasNumber ? styles.criteriaMet : ""
                    }
                  >
                    <i
                      className={`bi ${
                        passwordChecks.hasNumber
                          ? "bi-check-circle-fill"
                          : "bi-circle"
                      } me-1`}
                    ></i>
                    Angka (0-9)
                  </span>
                  <span
                    className={
                      passwordChecks.hasSymbol ? styles.criteriaMet : ""
                    }
                  >
                    <i
                      className={`bi ${
                        passwordChecks.hasSymbol
                          ? "bi-check-circle-fill"
                          : "bi-circle"
                      } me-1`}
                    ></i>
                    Simbol / 10+ huruf
                  </span>
                </div>
              </div>
            )}
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="konfirmasi" className="form-label">
                Konfirmasi {isForgot ? "Password Baru" : "Password"}
              </label>
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

          {isLogin && (
            <div className={styles.rowBetween}>
              <div className="form-check">
                <input
                  id="show"
                  type="checkbox"
                  className="form-check-input"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label htmlFor="show" className="form-check-label">
                  Tampilkan password
                </label>
              </div>

              <button
                type="button"
                className={styles.link}
                onClick={() => switchMode("forgot")}
              >
                Lupa password?
              </button>
            </div>
          )}

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading
              ? "Memproses..."
              : isLogin
              ? "Masuk"
              : isRegister
              ? "Daftar"
              : "Simpan Password Baru"}
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
