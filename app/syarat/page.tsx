import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan - TiketKu",
};

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
  title: string;
  items: NumberedItem[];
};

const sections: Section[] = [
  {
    title: "Akun TiketKu",
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
        text: "Perusahaan berhak sepenuhnya untuk sementara memblokir, menghapus, atau menonaktifkan akun Pengguna atas kebijakan Perusahaan sendiri dan untuk alasan apapun tanpa memberikan alasan atau tanpa memberikan pemberitahuan untuk memblokir, menghapus, atau menonaktifkan akun Pengguna. Alasan pemblokiran, penghapusan, atau penonaktifan akun Pengguna dapat termasuk tetapi tidak terbatas pada:",
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
        text: "Dengan memiliki Akun TiketKu, Pengguna dengan ini setuju untuk menanggung sendiri tanggung jawab, kerugian dan/atau kerugian yang timbul dari penggunaan Akun TiketKu.",
      },
      {
        num: "9.",
        text: "Perusahaan atas kebijakannya sendiri dapat mematikan fitur ini kapan saja tanpa pemberitahuan terlebih dahulu dengan alasan yang dianggap perlu oleh Perusahaan, termasuk namun tidak terbatas pada pemeliharaan atau peningkatan sistem.",
      },
    ],
  },
  {
    title: "Penggabungan Akun TiketKu",
    items: [
      {
        num: "1.",
        text: "Penggabungan Akun TiketKu akan dilakukan dengan cara sebagai berikut :",
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
        text: "Bila Pengguna tidak setuju atas penggabungan Akun TiketKu, maka :",
        subItems: [
          {
            label: "a.",
            text: "Bagi Pengguna yang belum terdaftar pada Situs Perusahaan, Pengguna dapat menghentikan dan tidak melanjutkan proses registrasi Akun TiketKu; atau",
          },
          {
            label: "b.",
            text: "Bagi Pengguna yang telah terdaftar pada masing-masing Situs Perusahaan maka Pengguna dapat melakukan penghapusan Akun Blibli, Akun tiket.com dan, Akun Ranch secara terpisah sebelum penggabungan Akun TiketKu dilakukan. Perusahaan akan mengkomunikasikan jadwal penggabungan Akun TiketKu kepada Pengguna secara berkala melalui e-mail.",
          },
        ],
      },
    ],
  },
  {
    title: "Lain-Lain",
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
  return (
    <main className="container py-5" style={{ maxWidth: 860 }}>
      <h1 className="fw-bold mb-4" style={{ color: "#000" }}>
        Syarat dan Ketentuan Penggabungan Akun TiketKu
      </h1>

      <p>
        {`Syarat dan Ketentuan Penggabungan Akun TiketKu ("Syarat dan Ketentuan") berlaku bagi pengguna sebagai pihak yang menggunakan layanan Perusahaan ("Pengguna"), yang disediakan oleh PT Global Digital Niaga Tbk. ("Blibli"), PT Global Tiket Network ("tiket.com"), PT Supra Boga Lestari Tbk. ("Ranch"), dan atau Blibli Group lainnya di kemudian hari. Seluruhnya Blibli, tiket.com, dan Ranch disebut sebagai "Perusahaan". Dengan mengakses Syarat dan Ketentuan ini, Pengguna menyatakan telah membaca, memahami, menerima, dan menyetujui syarat dan ketentuan serta kebijakan privasi di masing-masing Situs Perusahaan.`}
      </p>
      <p className="mb-4">
        {`Pengguna harap membaca dengan hati-hati Syarat dan Ketentuan ini. Pengguna wajib membaca, memahami, menerima dan menyetujui Syarat dan Ketentuan ini sebelum melanjutkan proses penggabungan Akun TiketKu. Jika Pengguna tidak menerima dan menyetujui salah satu, sebagian atau seluruh isi dari Syarat dan Ketentuan ini, Pengguna tidak diperkenankan untuk mengakses lebih lanjut dan dipersilakan untuk meninggalkan situs dan aplikasi seluler Perusahaan ("Situs Perusahaan").`}
      </p>

      {sections.map((s) => (
        <section key={s.title} className="mb-4">
          <h2 className="h5 fw-bold mb-3">{s.title}</h2>
          {s.items.map((item) => (
            <div key={item.num} className="mb-3">
              <div className="d-flex gap-2">
                <strong className="flex-shrink-0">{item.num}</strong>
                <div className="flex-grow-1">
                  <p className="mb-1">{item.text}</p>
                  {item.subItems?.map((sub) => (
                    <div key={sub.label} className="d-flex gap-2 mb-1 mt-1">
                      <strong className="flex-shrink-0">{sub.label}</strong>
                      <p className="mb-0">{sub.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
