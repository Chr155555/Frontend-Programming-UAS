import { PaymentMethod } from "../types";

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: "bca",
        name: "BCA Virtual Account",
        badge: "Verifikasi Instan",
        description: "Bayar via BCA Mobile, myBCA, KlikBCA, atau ATM BCA.",
        accountNumber: "3727 0608 07",
        instructions: [
            "Buka aplikasi BCA Mobile, myBCA, atau kunjungi ATM BCA terdekat.",
            "Pilih menu Transfer lalu pilih menu BCA Virtual Account.",
            "Masukkan nomor Virtual Account 3727 0608 07.",
            "Pastikan nominal tagihan tepat sesuai total pembayaran.",
            "Selesaikan transaksi dan simpan bukti pembayaran Anda.",
        ],
    },
    {
        id: "mandiri",
        name: "Mandiri Virtual Account",
        badge: "Verifikasi Instan",
        description: "Bayar via Livin' by Mandiri, ATM, atau Internet Banking.",
        accountNumber: "8870 0812 3456",
        instructions: [
            "Buka aplikasi Livin' by Mandiri atau ATM Mandiri terdekat.",
            "Pilih menu Bayar / Pembayaran, kemudian pilih Multi Payment.",
            "Pilih penyedia jasa TiketKu dan masukkan nomor Virtual Account 8870 0812 3456.",
            "Periksa nama pemesan dan nominal tagihan.",
            "Konfirmasi pembayaran dan masukkan PIN Anda.",
        ],
    },
    {
        id: "qris",
        name: "QRIS & E-Wallet",
        badge: "Bebas Biaya",
        description: "Pindai kode QR via GoPay, OVO, ShopeePay, DANA, atau AstraPay.",
        accountNumber: "NMID: ID1029384756",
        instructions: [
            "Buka aplikasi dompet digital pilihan Anda (GoPay, OVO, Dana, ShopeePay).",
            "Pilih menu Scan QR / Bayar dengan QRIS.",
            "Pindai kode QR yang tertera pada layar pemesanan.",
            "Periksa nominal pembayaran sesuai rincian.",
            "Tekan tombol Bayar dan masukkan PIN dompet digital Anda.",
        ],
    },
    {
        id: "card",
        name: "Kartu Kredit / Debit",
        badge: "Visa / Mastercard",
        description: "Dukungan 3D-Secure dengan standar enkripsi keamanan perbankan.",
        instructions: [
            "Masukkan 16 digit nomor kartu kredit atau debit Anda.",
            "Masukkan masa berlaku kartu (Bulan / Tahun) serta kode CVV di belakang kartu.",
            "Klik tombol Bayar Sekarang untuk diarahkan ke halaman 3D-Secure bank penerbit.",
            "Masukkan kode OTP yang dikirimkan oleh bank ke ponsel Anda.",
            "Pembayaran akan diverifikasi secara otomatis.",
        ],
    },
];
