import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="home">
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>
            Hai kamu, mau ke mana?
          </h1>
          <p>
            Tiketku - Satu aplikasi untuk kebutuhan liburanmu.
          </p>
          <h3>Cek promo menarik dibawah ini &#33;&#33;</h3>
        </div>
      </main>
      <section className="promo">
            <h1>Promo untuk pengguna baru!!</h1>
            <h4>klaim sekarang juga!</h4>
            {/* <div className="promo-cards">
                <div className="promo-items">
                    <h3>[Pengguna Baru] Diskon + Cashback hingga Rp2.000.000 untuk semua produk Tiketku</h3>
                    <div className="claim-promo">
                        <span id="kode1">TIKETKU2026</span>
                        
                    </div>
                </div>
                <div className="promo-items">
                    <h3>[Pengguna Baru] Diskon 20% dengan minimal pembelian IDR 3.000.000</h3>
                    <div className="claim-promo">
                        <span id="kode2">SAYAUNTAR</span>
                        
                    </div>
                </div>
                <div className="promo-items">
                    <h3>Tiket PayLater - Diskon + Cashback hingga IDR 4.000.000 untuk produk pilihan di Tiketku</h3>
                    <div className="claim-promo">
                        <span id="kode3">PIKACHUARDI</span>
                        
                    </div>
                </div>
                <div className="promo-items">
                    <h3>Kredivo - Diskon + Cashback IDR 80.000 untuk produk pilihan di Tiketku</h3>
                    <div className="claim-promo">
                        <span id="kode4">HARTBDLUCKY</span>
                        
                    </div>
                </div>
                <div className="promo-items">
                    <h3>OVO - Diskon hingga IDR 100.000 untuk produk pilihan di Tiketku</h3>
                    <div className="claim-promo">
                        <span id="kode5">JHONJR123</span>
                        
                    </div>
                </div>
                <div className="promo-items">
                    <h3>[Pengguna Baru] Diskon 10% tanpa minimal pembelian tiket dan hotel</h3>
                    <div className="claim-promo">
                        <span id="kode6">CHRSADMINDEV</span>
                        
                    </div>
                </div>
                <div className="promo-items">
                    <h3>[Pengguna Baru] Cashback IDR 100.000 untuk minimal pembayaran IDR 5.000.000</h3>
                    <div className="claim-promo">
                        <span id="kode7">TIKETJOSEPH</span>
                        
                    </div>
                </div>
            </div> */}
        </section>
    </div>
    
  );
}
