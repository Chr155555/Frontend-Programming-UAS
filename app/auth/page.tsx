"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
    telepon: "",
    email: "",
    password: "",
    konfirmasi: "",
  });

  // OTP verification simulation state
  const [otpStep, setOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

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
    setOtpStep(false);
    setError("");
    setSuccess("");
  };

  const generateNewOtp = () => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpTimer(30);
    setOtpStep(true);
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    setOtpDigits(updated);

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleFillOtpAuto = () => {
    if (!generatedOtp) return;
    setOtpDigits(generatedOtp.split(""));
  };

  const finalizeRegisterOrReset = async () => {
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: form.nama,
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Terjadi kesalahan saat mendaftar.");
          setOtpStep(false);
          return;
        }
        if (data.user) {
          localStorage.setItem("tiketku_user", JSON.stringify(data.user));
          window.dispatchEvent(new Event("tiketku-auth-change"));
        }
        setSuccess(
          "Verifikasi OTP berhasil! Akun aktif & mengalihkan ke beranda..."
        );
        setTimeout(() => router.push("/"), 800);
      } else if (isForgot) {
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
          setOtpStep(false);
          return;
        }
        setSuccess(
          data.message || "Password berhasil diperbarui! Silakan masuk."
        );
        setTimeout(() => {
          setOtpStep(false);
          setMode("login");
        }, 1200);
      }
    } catch {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otpStep) {
      const entered = otpDigits.join("");
      if (entered.length < 6) {
        setError("Masukkan 6 digit kode OTP terlebih dahulu.");
        return;
      }
      if (entered !== generatedOtp) {
        setError("Kode OTP tidak sesuai. Cek kode simulasi di kotak biru atas.");
        return;
      }
      await finalizeRegisterOrReset();
      return;
    }

    if (!isLogin) {
      if (form.password !== form.konfirmasi) {
        setError("Konfirmasi password tidak sama.");
        return;
      }
      generateNewOtp();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
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

      setSuccess("Login berhasil! Mengalihkan ke beranda...");

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
          {otpStep ? (
            <div className={styles.otpContainer}>
              <div className={styles.otpBadge}>
                <i className="bi bi-envelope-check-fill me-1"></i>
                Simulasi OTP ke <strong>{form.email}</strong>:{" "}
                <strong className="fs-6 text-decoration-underline">
                  {generatedOtp}
                </strong>
                <button
                  type="button"
                  onClick={handleFillOtpAuto}
                  className="btn btn-sm ms-2 py-0 px-2 text-white"
                  style={{
                    fontSize: "0.75rem",
                    backgroundColor: "#0284c7",
                  }}
                >
                  Isi Otomatis
                </button>
              </div>

              <p className="small text-muted mb-2">
                Masukkan 6 digit kode verifikasi keamanan untuk melanjutkan:
              </p>

              <div className={styles.otpInputs}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={styles.otpDigit}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  />
                ))}
              </div>

              <div className="mb-3 small">
                {otpTimer > 0 ? (
                  <span className="text-muted">
                    Kirim ulang kode dalam <strong>{otpTimer}d</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.link}
                    onClick={generateNewOtp}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>Kirim Ulang
                    Kode OTP
                  </button>
                )}
                <span className="mx-2 text-muted">•</span>
                <button
                  type="button"
                  className={styles.link}
                  onClick={() => setOtpStep(false)}
                >
                  Ubah Data
                </button>
              </div>
            </div>
          ) : (
            <>
              {isRegister && (
                <>
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

                  <div className="mb-3">
                    <label htmlFor="telepon" className="form-label">
                      Nomor Telepon (Untuk Penggabungan Akun)
                    </label>
                    <input
                      id="telepon"
                      name="telepon"
                      type="tel"
                      className="form-control"
                      placeholder="Contoh: 081234567890"
                      value={form.telepon}
                      onChange={handleChange}
                    />
                  </div>
                </>
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
            </>
          )}

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading
              ? "Memproses..."
              : otpStep
              ? "Verifikasi Kode OTP"
              : isLogin
              ? "Masuk"
              : isRegister
              ? "Lanjut Verifikasi OTP"
              : "Kirim OTP Reset Password"}
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
