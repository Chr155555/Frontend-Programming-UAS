type Section = {
	title: string;
	paragraphs?: string[];
	items?: { label?: string; judul?: string; text: string }[];
	after?: string[];
};

const daftarIsi = [
	"Produk-produk TiketKu",
	"Cara memesan produk TiketKu",
	"Cara menggunakan kode promo TiketKu",
];

const sections: Section[] = [
		{
				title: "Produk-produk TiketKu",
				paragraphs: [
						"TiketKu menyediakan tiga produk, yaitu pemesanan paket liburan, tiket pesawat, dan booking hotel. Masing-masing produk dapat diakses melalui link di bagian atas maupun bawah halaman ini.",
						"Pada produk paket, kami menyediakan bundle tiket pesawat, hotel, dan wisata setempatnya. Anda cukup memilih paket yang diinginkan dan membayar sekali untuk mendapatkan semua fitur sekaligus.",
						"Produk tiket pesawat dan booking hotel menyediakan tanggal maupun tempat yang lebih spesifik sesuai keperluan anda.",
				],
		},
		{
				title: "Cara memesan produk tiketku",
				items: [
				{
						label: "a.",
						text: "Pilih paket/tiket pesawat/hotel yang ingin dipesan.",
				},
				{
						label: "b.",
						text: "Lakukan konfirmasi pembayaran setelah anda memastikan keterangan seperti tujuan, harga, kota asal, dan tanggal pergi/pulang.",
				},
				{
						label: "c.",
						text: "Di halaman pembayaran, anda dapat memilih antara virtual account BCA/Mandiri, QRIS/E-wallet, dan kartu kredit/debit. Lakukan pembayaran sesuai instruksi masing=masing metode.",
				},
				],
		},
		{
				title: "Cara menggunakan kode promo TiketKu",
				paragraphs: [
				"TiketKu menyediakan sejumlah kode promo yang dapat digunakan pada proses pembayaran produk. Anda dapat menggunakannya dengan cara berikut:",
				],
				items: [
				{
						label: "a.",
						text: "Cari kode promo yang tersedia di halaman utama TiketKu.",
				},
				{
						label: "b.",
						text: "Salin kode promo tersebut.",
				},
				{
						label: "c.",
						text: "Masukkan ke dalam kolom kode promo pada bagian rincian harga di halaman pemesanan.",
				},
				{
						label: "d.",
						text: "Mengajukan penarikan persetujuan Anda untuk pemrosesan Data Pribadi Anda (di mana Kami memproses Data Pribadi Anda berdasarkan persetujuan Anda).",
				},
				{
						label: "e.",
						text: "Klik 'terapkan', diskon akan diterapkan secara instan ke total pembayaran anda.",
				},
				],
				after: [
				"Untuk bantuan lebih lanjut atau pertanyaan yang lebih spesifik, anda dapat kontak kami melalui email cs@tiketku.id maupun call center pada +62 ### #### ####.",
				],
		},
];

export default function KebijakanPage() {
	return (
		<main className="container py-5" style={{ maxWidth: 860 }}>
			<h1 className="fw-bold mb-4" style={{ color: "#000" }}>
				Help Center TiketKu
			</h1>

			<p>Selamat datang di help center TiketKu.</p>
			<p>
				{`Di halaman ini, anda bisa melihat panduan untuk menggunakan website.`}
			</p>

			<p className="fw-bold mb-1">Pemberitahuan Privasi ini mencakup:</p>
			<ul className="mb-4">
				{daftarIsi.map((d) => (
					<li key={d}>{d}</li>
				))}
			</ul>

			{sections.map((s) => (
				<section key={s.title} className="mb-4">
					<h2 className="h5 fw-bold text-uppercase">{s.title}</h2>
					{s.paragraphs?.map((p) => (
						<p key={p}>{p}</p>
					))}
					{s.items?.map((it) => (
						<div key={it.text} className="d-flex gap-2 mb-2">
							{it.label && (
								<strong className="flex-shrink-0">{it.label}</strong>
							)}
							<div>
								{it.judul && <strong className="d-block">{it.judul}</strong>}
								<p className="mb-0">{it.text}</p>
							</div>
						</div>
					))}
					{s.after?.map((p) => (
						<p key={p} className="mt-3">
							{p}
						</p>
					))}
				</section>
			))}
		</main>
	);
}
