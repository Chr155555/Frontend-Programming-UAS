import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemberitahuan Privasi - TiketKu",
};

type Section = {
  title: string;
  paragraphs?: string[];
  items?: { label?: string; judul?: string; text: string }[];
  after?: string[];
};

const daftarIsi = [
  "Pengumpulan Data Pribadi",
  "Data Pribadi Anak",
  "Dasar Pemrosesan Data Pribadi",
  "Tujuan Pengelolaan dan Penggunaan Data Pribadi",
  "Pengungkapan Data Pribadi",
  "Penggunaan Cookie & Teknologi Serupa",
  "Hak Anda Sebagai Pemilik Data Pribadi",
  "Penyimpanan, Penarikan Persetujuan, dan Penghapusan",
  "Transfer Data Pribadi",
  "Keamanan Data Pribadi",
  "Perubahan Pada Pemberitahuan Privasi ini",
  "Hukum yang Berlaku dan Penggunaan Bahasa",
  "Bantuan Lebih Lanjut",
];

const sections: Section[] = [
  {
    title: "Pengumpulan Data Pribadi",
    paragraphs: [
      "Kami mengumpulkan Data Pribadi yang relevan untuk mendaftarkan, mengelola, dan mengoptimalkan manfaat sistem, program, dan layanan dalam ekosistem Kami, termasuk namun tidak terbatas pada sistem keanggotaan, program loyalitas, pembayaran, teknis, dan layanan lainnya yang Kami sampaikan untuk kepentingan Anda.",
      "Kami dapat memperoleh Data Pribadi Anda baik dari Anda sendiri maupun sumber lainnya yang diperoleh dan dikelola di masing-masing Platforms, seperti mitra bisnis, penyedia layanan logistik, pihak ketiga, mitra pemasaran, program rujukan atau loyalitas, pengguna layanan, atau data dalam domain publik dan pemerintahan.",
      "Dalam beberapa kasus, Anda dapat memberikan Data Pribadi individu lain kepada Kami, seperti anggota keluarga atau teman, dan Anda diharapkan telah mendapatkan persetujuan mereka untuk diproses sesuai dengan tujuan pemrosesan data dan peraturan perundang-undangan yang berlaku.",
    ],
  },
  {
    title: "Data Pribadi Anak",
    paragraphs: [
      "Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak yang menggunakan Platforms. Kami mengharapkan orang tua atau wali untuk mengawasi penggunaan layanan dan jika diperlukan memberikan persetujuan atas penggunaan informasi pribadi anak-anak tersebut.",
      "Ketentuan terhadap pemrosesan Data Pribadi anak akan menyesuaikan dengan kebijakan setiap Platforms.",
    ],
  },
  {
    title: "Dasar Pemrosesan Data Pribadi",
    paragraphs: [
      "Untuk menjaga kepercayaan Anda, maka Kami hanya memproses Data Pribadi dengan dasar pemrosesan yang sah, meliputi:",
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
        text: "Kami memproses Data Pribadi Anda untuk mematuhi regulasi yang berlaku.",
      },
      {
        label: "d.",
        judul: "Pemenuhan Kontrak",
        text: "Kami dapat memproses Data Pribadi Anda untuk memenuhi kewajiban kontraktual Kami ketika Anda melakukan transaksi atau pemesanan.",
      },
      {
        label: "e.",
        judul: "Kepentingan Vital",
        text: "Kami dapat memproses Data Pribadi Anda untuk melindungi kepentingan vital Anda jika diperlukan.",
      },
    ],
  },
  {
    title: "Tujuan Pengelolaan dan Penggunaan Data Pribadi",
    paragraphs: [
      "Informasi dan Data Pribadi yang diperoleh senantiasa Kami kelola sesuai kebutuhan Anda pada masing-masing Platforms, dengan mengikuti standar keamanan yang sesuai. Adapun data atau informasi yang Kami peroleh akan digunakan untuk manfaat Anda, termasuk namun tidak terbatas pada:",
    ],
  },
  {
    title: "Penggunaan Cookie atau Teknologi Serupa",
    items: [
      {
        label: "a.",
        text: "Perusahaan dapat menggunakan teknologi, seperti cookie, web beacon, atau teknologi serupa saat Anda menggunakan sistem, program, dan layanan Kami atau mengakses Platforms Kami. Data yang dikumpulkan digunakan untuk analisis, evaluasi, personalisasi konten, dan penyediaan iklan yang relevan. Cookie adalah berkas teks kecil yang memungkinkan pengenalan perangkat atau peramban Anda, sementara web beacon membantu Kami memahami preferensi Anda.",
      },
      {
        label: "b.",
        text: "Anda dapat mengelola cookie melalui pengaturan peramban atau perangkat Anda dan/atau melalui pengaturan pada Platforms, namun perlu diingat bahwa beberapa cookie diperlukan untuk fungsionalitas inti Platforms Kami.",
      },
      {
        label: "c.",
        text: "Kami dapat menggunakan cookie atau teknologi serupa untuk memperbaiki layanan Kami dan menawarkan fitur baru. Anda dapat menolak atau membatasi penggunaan cookie pada Platforms, tetapi hal tersebut dapat membatasi fungsionalitas Platforms atau Layanan yang Kami berikan.",
      },
    ],
  },
  {
    title: "Hak Anda Sebagai Pemilik Data Pribadi",
    paragraphs: [
      "Sebagai pengguna sistem, program, dan layanan Kami, Anda memiliki hak untuk:",
    ],
    items: [
      {
        label: "a.",
        text: "Mengakses Data Pribadi Anda dan mendapatkan salinan informasi terkait Data Pribadi Anda yang Kami simpan.",
      },
      {
        label: "b.",
        text: "Melakukan perubahan dan perbaikan terhadap Data Pribadi Anda.",
      },
      {
        label: "c.",
        text: "Mengajukan pengakhiran pemrosesan, menghapus, dan/atau memusnahkan Data Pribadi Anda.",
      },
      {
        label: "d.",
        text: "Mengajukan penarikan persetujuan Anda untuk pemrosesan Data Pribadi Anda (di mana Kami memproses Data Pribadi Anda berdasarkan persetujuan Anda).",
      },
      {
        label: "e.",
        text: "Mengajukan pembatasan pemrosesan tertentu yang dianggap tidak relevan bagi Anda.",
      },
    ],
    after: [
      "Kami berkomitmen untuk memastikan proses ini berjalan transparan dan sesuai dengan prinsip perlindungan data pribadi. Oleh karena itu, mekanisme pemenuhan hak subjek data akan disesuaikan dengan kebijakan setiap Platforms, dengan tetap tunduk pada ketentuan hukum dan peraturan yang berlaku. Perlu dipahami bahwa seluruh pengecualian dalam memenuhi hak-hak subjek data pribadi akan disesuaikan dengan kebijakan setiap Platforms dan ketentuan hukum yang berlaku.",
    ],
  },
];

export default function KebijakanPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 860 }}>
      <h1 className="fw-bold mb-4" style={{ color: "#000" }}>
        Pemberitahuan Privasi TiketKu
      </h1>

      <p>Selamat datang di situs TiketKu.</p>
      <p>
        Situs ini dioperasikan oleh TiketKu (&quot;TiketKu&quot;,
        &quot;Perusahaan&quot;, atau &quot;Kami&quot;). Kami mengoperasikan situs
        web dan layanan yang tersedia secara online melalui situs web:
        account.bliblitiket.com untuk ios dan untuk android.
      </p>
      <p>
        Di TiketKu, privasi Anda dan perlindungan data pribadi Anda
        merupakan hal yang sangat penting bagi Kami. Data pribadi adalah setiap
        informasi yang berkaitan dengan seseorang yang teridentifikasi atau dapat
        diidentifikasi. Seseorang yang dapat diidentifikasi adalah individu yang
        dapat dikenali, baik secara langsung maupun tidak langsung melalui
        kombinasi dengan informasi lainnya, baik melalui sistem elektronik atau
        nonelektronik (&quot;Data Pribadi&quot;).
      </p>
      <p>
        Pemberitahuan Privasi ini menjelaskan bagaimana Kami mengumpulkan,
        menggunakan, menyimpan, dan melindungi Data Pribadi yang terkait dengan
        sistem, program, dan layanan dalam ekosistem Kami, yang terintegrasi di
        berbagai platforms yang tergabung.
      </p>
      <p>
        Dengan bergabung dalam ekosistem ini, Anda memahami bahwa Data Pribadi
        Anda dapat dibagikan, diakses, dan dikelola bersama oleh
        platform-platform yang berpartisipasi (&quot;Platforms&quot;) untuk
        kepentingan Anda. Kami menghargai privasi Anda sehingga Kami berkomitmen
        untuk menjaga kerahasiaan serta melindungi Data Pribadi sesuai dengan
        peraturan perundang-undangan yang berlaku.
      </p>
      <p>
        Untuk menjaga kepercayaan Anda terhadap sistem, program, dan layanan pada
        ekosistem TiketKu, maka Kami menganjurkan Anda untuk membaca
        Pemberitahuan Privasi ini secara berkala untuk memahami pengelolaan Data
        Pribadi milik Anda di ekosistem Kami.
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
