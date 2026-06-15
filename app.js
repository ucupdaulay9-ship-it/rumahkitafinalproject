// Konfigurasi Firebase harus sama dengan di login.js
const firebaseConfig = {
    apiKey: "AIzaSyAjLBsc_vrHt5DW8qyfl6cCvaXlppJKe4w",
    authDomain: "webbku-4bf7b.firebaseapp.com",
    projectId: "webbku-4bf7b",
    storageBucket: "webbku-4bf7b.firebasestorage.app",
    messagingSenderId: "886815966817",
    appId: "1:886815966817:web:7cc86f3975979bb8608c20"
  };


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// Cek Status Login
auth.onAuthStateChanged((user) => {
    if (user) {
        // Tampilkan data user di halaman Account jika beneran login
        document.getElementById("userName").innerText = user.displayName;
        document.getElementById("userPhoto").src = user.photoURL;
    } else {
        // --- KODE ASLI DIMATIKAN SEMENTARA (DIBERI KOMENTAR //) ---
        //firebase2 hapus "//"
        window.location.href = "index.html";
        
        // --- TAMBAHKAN DATA DUMMY SEMENTARA UNTUK PREVIEW ---
     //   document.getElementById("userName").innerText = "Mode Edit (Tanpa Login)";
     //  document.getElementById("userPhoto").src = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Foto profil default
       //firebase3 hapus data dummy
    }
});


// Fungsi Logout
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}


// Fungsi Ganti Menu Navigasi Bawah
function bukaMenu(idMenu, elemenNav) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Hilangkan efek aktif di semua icon navigasi
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => nav.classList.remove('active'));

    // Tampilkan section yang dipilih & beri efek aktif pada icon yang diklik
    document.getElementById(idMenu).classList.add('active');
    elemenNav.classList.add('active');

    // --- LOGIKA BARU: Transisi Background Smooth ---
    // Sembunyikan semua layer background
    const bgLayers = document.querySelectorAll('.bg-theme');
    bgLayers.forEach(bg => bg.classList.remove('active-bg'));

    // Tampilkan layer background yang sesuai dengan menu
    document.getElementById('bg-' + idMenu).classList.add('active-bg');
}



// Fungsi Interaksi Animasi Kayu saat ditekan
function sentuhPapan(elemen) {
    // Tambahkan class ditekan
    elemen.classList.add('ditekan');
    
    // Hilangkan kembali setelah 300 milidetik agar memantul balik
    setTimeout(() => {
        elemen.classList.remove('ditekan');
    }, 300);
}


// Fungsi Animasi Cangkir Kopi
function seduhKopi(event, elemen) {
    // Mencegah klik tembus ke papan kayu (agar papannya tidak ikut goyang saat cangkir diklik)
    event.stopPropagation(); 
    
    // Tambahkan class menyeduh untuk memicu animasi asap di CSS
    elemen.classList.add('menyeduh');
    
    // Hapus class setelah 2 detik agar animasi bisa diulang jika diklik lagi
    setTimeout(() => {
        elemen.classList.remove('menyeduh');
    }, 1600);
}


// --- SISTEM TIMER WAKTU BERSAMA --- //

// UBAH TANGGAL DI BAWAH INI SESUAI TANGGAL JADIAN KALIAN
// Format: "YYYY-MM-DDTHH:MM:SS" (Gunakan T00:00:00 untuk jam 12 malam)
const TANGGAL_JADIAN = new Date("2023-05-20T00:00:00").getTime();

function hitungWaktuBersama() {
    // Cek apakah elemen timer ada di halaman (mencegah error)
    if (!document.getElementById('t-tahun')) return;

    const tglAwal = new Date(TANGGAL_JADIAN);
    const tglSekarang = new Date();

    // Hitung selisih Tahun, Bulan, dan Hari
    let thn = tglSekarang.getFullYear() - tglAwal.getFullYear();
    let bln = tglSekarang.getMonth() - tglAwal.getMonth();
    let hr = tglSekarang.getDate() - tglAwal.getDate();

    // Penyesuaian jika hari negatif (pinjam dari bulan sebelumnya)
    if (hr < 0) {
        bln--;
        const bulanSebelumnya = new Date(tglSekarang.getFullYear(), tglSekarang.getMonth(), 0).getDate();
        hr += bulanSebelumnya;
    }
    
    // Penyesuaian jika bulan negatif (pinjam dari tahun sebelumnya)
    if (bln < 0) {
        thn--;
        bln += 12;
    }

    // Hitung selisih Jam, Menit, Detik menggunakan matematika sisa waktu
    const selisihTotal = tglSekarang.getTime() - tglAwal.getTime();
    const sisaWaktuHariIni = selisihTotal % (1000 * 60 * 60 * 24); // Sisa ms dalam hari ini
    
    const j = Math.floor(sisaWaktuHariIni / (1000 * 60 * 60));
    const m = Math.floor((sisaWaktuHariIni % (1000 * 60 * 60)) / (1000 * 60));
    const d = Math.floor((sisaWaktuHariIni % (1000 * 60)) / 1000);

    // Tampilkan ke layar (tambahkan angka 0 di depan jika di bawah 10 untuk jam/menit/detik)
    document.getElementById('t-tahun').innerText = thn;
    document.getElementById('t-bulan').innerText = bln;
    document.getElementById('t-hari').innerText = hr;
    document.getElementById('t-jam').innerText = j.toString().padStart(2, '0');
    document.getElementById('t-menit').innerText = m.toString().padStart(2, '0');
    document.getElementById('t-detik').innerText = d.toString().padStart(2, '0');
}

// Jalankan fungsi setiap 1 detik (1000 milidetik)
setInterval(hitungWaktuBersama, 1000);
// Jalankan langsung sekali saat web dimuat
hitungWaktuBersama();


// --- FUNGSI INTERAKSI KLIK PADA KOTAK TIMER (FLIP 3D) --- //
function putarBox(event, elemen) {
    // Mencegah klik tembus memicu elemen lain (seperti background atau body)
    event.stopPropagation();
    
    // Tutup semua kotak lain yang mungkin sedang terbuka
    const semuaBox = document.querySelectorAll('.waktu-box');
    semuaBox.forEach(box => {
        if (box !== elemen) {
            box.classList.remove('terbalik');
        }
    });

    // Balik kotak yang sedang diklik (jika tertutup jadi terbuka, jika terbuka jadi tertutup)
    elemen.classList.toggle('terbalik');
}

// Logika Deteksi: Klik di sembarang tempat (di luar kotak) untuk mengembalikan/menutup kartu
document.addEventListener('click', function(event) {
    const boxTerbuka = document.querySelectorAll('.waktu-box.terbalik');
    
    boxTerbuka.forEach(box => {
        // Jika yang diklik bukan elemen kotak itu sendiri, tutup kotak tersebut
        if (!box.contains(event.target)) {
            box.classList.remove('terbalik');
        }
    });
});




// =====================================================================
// --- SISTEM CUSTOM ALERT (TOAST) KANAN ATAS ---
// =====================================================================
function showToast(pesan, tipe = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    let iconHtml = '<i class="fa-solid fa-circle-info" style="color: var(--coklat-sedang);"></i>';
    if (tipe === 'error') iconHtml = '<i class="fa-solid fa-circle-exclamation" style="color: #d9534f;"></i>';
    if (tipe === 'success') iconHtml = '<i class="fa-solid fa-circle-check" style="color: #2E8B57;"></i>';

    const toast = document.createElement('div');
    toast.className = `toast-alert ${tipe}`;
    toast.innerHTML = `<span class="toast-icon">${iconHtml}</span><span>${pesan}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 3500);
}

// =====================================================================
// --- SISTEM DATABASE KARTU PASANGAN (PAPAN 3 BARU) ---
// =====================================================================
// firebase4 "hapus tanda //"
 const database = firebase.database();
let myUID = null;
let partnerUID = null;

// Deteksi tanggal hari ini (Format: YYYY-MM-DD)
function getTanggalHariIni() {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    return (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
}

// 1. DETEKSI LOGIN & KUNCI 2 AKUN (Tanpa Hardcode Email)
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        myUID = user.uid;
        verifikasiPasangan(myUID);
          // >>> TAMBAHKAN BARIS INI DI SINI <<<
        inisialisasiPapan4();
        pantauHistoriNotifikasi();
        simpanHistoriNotif(myUID, "Kamu baru saja memasuki ruang rahasia.");
    }
});

function verifikasiPasangan(uid) {
    const refPasangan = database.ref('ruang_rahasia/pasangan_terkunci');
    
    refPasangan.once('value', (snapshot) => {
        const data = snapshot.val() || {};
        
        if (!data.user1) {
            // Jika kosong, orang pertama yang login jadi User 1
            refPasangan.update({ user1: uid });
            partnerUID = null; // Pasangan belum login
            mulaiSistemKartu();
        } else if (data.user1 === uid) {
            // Jika yang login adalah User 1
            partnerUID = data.user2 || null;
            mulaiSistemKartu();
        } else if (!data.user2) {
            // Orang kedua yang login otomatis jadi User 2
            refPasangan.update({ user2: uid });
            partnerUID = data.user1;
            mulaiSistemKartu();
        } else if (data.user2 === uid) {
            // Jika yang login adalah User 2
            partnerUID = data.user1;
            mulaiSistemKartu();
        } else {
            // ORANG KETIGA MENCOBA MASUK! Akses Ditolak!
            showToast("Maaf, ruang rahasia ini sudah terisi oleh 2 orang.", "error");
            firebase.auth().signOut(); 
        }
    });
}

// 2. MUNCULKAN KARTU MILIKKU SAJA
let kartuBelumDitarik = [];

function mulaiSistemKartu() {
    if (!myUID) return;

    const myStackRef = database.ref(`ruang_rahasia/kartu_stack/${myUID}`);
    
    // Berikan 1 kartu default jika tumpukanku kosong
    myStackRef.once('value', (snap) => {
        if (!snap.exists()) {
            myStackRef.push({
                teks: "Selamat datang di ruang rahasia kita. Tulis pesan pertamamu untuknya di bawah!",
                desain: `desain-${Math.floor(Math.random() * 7)}`,
                status: 'belum',
                timestamp: Date.now()
            });
        }
    });

    // Tampilkan kartuku secara realtime
    myStackRef.orderByChild('timestamp').on('value', (snapshot) => {
        const wadah = document.getElementById('wadahKartu');
        if (!wadah) return; 
        
        wadah.innerHTML = '';
        kartuBelumDitarik = [];
        const hariIni = getTanggalHariIni();

        if (snapshot.exists()) {
            let indexVisual = 0;
            
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                
                // Tetap terbuka sampai jam 00.00
                if (data.status === 'belum' || data.status === hariIni) {
                    kartuBelumDitarik.push({ id: childSnapshot.key, ...data });
                    
                    const divKartu = document.createElement('div');
                    divKartu.className = 'kartu-item';
                    const isTerbuka = (data.status === hariIni);
                    
                    if (isTerbuka) {
                        divKartu.classList.add('terbuka');
                    } else {
                        const rotasiAcak = (Math.random() * 6 - 3).toFixed(1); 
                        divKartu.style.transform = `rotate(${rotasiAcak}deg) translateY(-${indexVisual * 3}px)`;
                    }
                    
                    divKartu.style.zIndex = 50 - indexVisual; 
                    divKartu.innerHTML = `
                        <div class="kartu-cover">?</div>
                        <div class="kartu-isi ${data.desain}">
                            <span>${data.teks}</span>
                        </div>
                    `;
                    
                    if (indexVisual === 0 && !isTerbuka) {
                        divKartu.onclick = () => bukaKartuPalingAtas(divKartu, childSnapshot.key);
                    }
                    
                    wadah.appendChild(divKartu);
                    indexVisual++;
                }
            });
            
            if (kartuBelumDitarik.length === 0) {
                wadah.innerHTML = '<div style="font-size:11px; color:#A0522D; margin-top:50px; font-weight:bold; text-align:center;">Yah, pesannya habis! Tunggu dia menulis pesan baru ya.</div>';
            }
        }
    });
}

// 3. FUNGSI BUKA KARTU (Batas 1x Sehari)
function bukaKartuPalingAtas(elemenVisual, idKartu) {
    const hariIni = getTanggalHariIni();
    const refJejakBuka = database.ref(`ruang_rahasia/sistem_harian/${myUID}/tanggal_buka_terakhir`);
    
    refJejakBuka.once('value', (snap) => {
        if (snap.val() === hariIni) {
            showToast("Sabar ya sayang, jatah buka kartu hari ini sudah habis! Tunggu besok lagi.", "info");
        } else {
            elemenVisual.classList.add('terbuka');
            elemenVisual.onclick = null; 
            
            refJejakBuka.set(hariIni);
            showToast("Yeay! Kartu rahasia dari dia berhasil dibuka.", "success");

simpanHistoriNotif(partnerUID, "Ssst, pasanganmu baru saja membuka kartu kejutan darimu hari ini.");

            setTimeout(() => {
                database.ref(`ruang_rahasia/kartu_stack/${myUID}/${idKartu}`).update({ status: hariIni });
            }, 1500);
        }
    });
}

// 4. FUNGSI KIRIM PESAN KE PASANGAN (Batas 1x Sehari)
function simpanKartuBaru() {
    const input = document.getElementById('inputPesanBaru');
    const pesan = input.value.trim();
    const info = document.getElementById('info-input-pesan');
    const hariIni = getTanggalHariIni();

    if (pesan === "") {
        return showToast("Pesan rahasia tidak boleh kosong!", "error");
    }

    // CEK: Apakah pasangan sudah pernah login?
    if (!partnerUID) {
        showToast("Pasanganmu belum pernah login! Suruh dia buka webnya sekali agar kalian terhubung.", "error");
        return;
    }

    const refJejakInput = database.ref(`ruang_rahasia/sistem_harian/${myUID}/tanggal_input_terakhir`);

    refJejakInput.once('value', (snap) => {
        if (snap.val() === hariIni) {
            info.innerText = "Kamu sudah mengirim pesan hari ini. Tulis lagi besok ya!";
            info.style.color = "#d9534f";
            showToast("Kuota menulismu hari ini sudah habis.", "error");
        } else {
            const desainAcak = 'desain-' + Math.floor(Math.random() * 7);
            
            // LOGIKA BARU: Kirim pesan ke tumpukan (Stack) milik Pasangan, BUKAN milik sendiri
            database.ref(`ruang_rahasia/kartu_stack/${partnerUID}`).push({
                teks: pesan,
                desain: desainAcak,
                status: 'belum',
                timestamp: Date.now() 
            }).then(() => {
                refJejakInput.set(hariIni);
                input.value = "";
                
                info.innerText = "Pesan berhasil dikirim dan terselip di tumpukan kartunya!";
                info.style.color = "#2E8B57"; 
                showToast("Pesan rahasiamu berhasil terkirim!", "success");
            });
        }
    });
}



// =====================================================================
// --- SISTEM CUACA REAL-TIME & GPS (PAPAN 4) ---
// =====================================================================
function inisialisasiPapan4() {
    mintaIzinNotifikasi();
    tarikLokasiGPS();
    pantauCuacaBersama();
    pantauKalender();
}

// 1. Dapatkan izin notifikasi perangkat
function mintaIzinNotifikasi() {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

// 2. Baca GPS & Simpan ke Firebase
function tarikLokasiGPS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            if (myUID) {
                database.ref(`ruang_rahasia/lokasi/${myUID}`).set({ lat, lon, timestamp: Date.now() });
            }
        }, () => {
            document.getElementById('lokasi-ku').innerText = "GPS Mati / Ditolak";
        });
    }
}

// Konversi kode cuaca ke Ikon FontAwesome
function getIkonCuaca(kode) {
    if(kode === 0) return 'fa-sun';
    if(kode >= 1 && kode <= 3) return 'fa-cloud-sun';
    if(kode >= 45 && kode <= 48) return 'fa-smog';
    if(kode >= 51 && kode <= 67) return 'fa-cloud-rain';
    if(kode >= 71 && kode <= 77) return 'fa-snowflake';
    if(kode >= 80 && kode <= 82) return 'fa-cloud-showers-water';
    if(kode >= 95) return 'fa-cloud-bolt';
    return 'fa-cloud';
}

// 3. Tarik API Cuaca Gratis (Open-Meteo & Nominatim)
function prosesDataCuaca(uidTarget, lat, lon, idElemen) {
    // Tarik Suhu Cuaca
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
        const cw = data.current_weather;
        document.getElementById(`suhu-${idElemen}`).innerText = `${Math.round(cw.temperature)}°C`;
        document.getElementById(`ikon-cuaca-${idElemen}`).className = `fa-solid ${getIkonCuaca(cw.weathercode)} ikon-cuaca`;
    });

    // Tarik Nama Kota (Reverse Geocoding)
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(r => r.json())
    .then(geo => {
        let kota = geo.address.city || geo.address.town || geo.address.village || geo.address.county || "Terdeteksi";
        document.getElementById(`lokasi-${idElemen}`).innerText = kota;
    }).catch(() => document.getElementById(`lokasi-${idElemen}`).innerText = "Satelit Aktif");
}

function pantauCuacaBersama() {
    database.ref('ruang_rahasia/lokasi').on('value', snap => {
        if(!snap.exists()) return;
        const data = snap.val();
        if(myUID && data[myUID]) prosesDataCuaca(myUID, data[myUID].lat, data[myUID].lon, 'ku');
        if(partnerUID && data[partnerUID]) prosesDataCuaca(partnerUID, data[partnerUID].lat, data[partnerUID].lon, 'dia');
    });
}

// =====================================================================
// --- SISTEM KALENDER INTERAKTIF & MODAL (PAPAN 4) ---
// =====================================================================
let bulanSaatIni = new Date().getMonth();
let tahunSaatIni = new Date().getFullYear();
let dataKalender = {};

function renderKalender() {
    const grid = document.getElementById('grid-tanggal');
    if (!grid) return;
    
    grid.innerHTML = '';
    const tglPertama = new Date(tahunSaatIni, bulanSaatIni, 1).getDay();
    const jmlHari = new Date(tahunSaatIni, bulanSaatIni + 1, 0).getDate();
    
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById('bulan-tahun-kalender').innerText = `${namaBulan[bulanSaatIni]} ${tahunSaatIni}`;

    // Buat grid kosong untuk hari sebelum tanggal 1
    for(let i = 0; i < tglPertama; i++) {
        grid.innerHTML += `<div class="tgl-item tgl-kosong"></div>`;
    }

    const hariIniReal = new Date();

    // Generate tanggal sebulan
    for(let i = 1; i <= jmlHari; i++) {
        let strBulan = (bulanSaatIni+1).toString().padStart(2, '0');
        let strHari = i.toString().padStart(2, '0');
        let formatDb = `${tahunSaatIni}-${strBulan}-${strHari}`; // YYYY-MM-DD
        
        let kelasHariIni = (i === hariIniReal.getDate() && bulanSaatIni === hariIniReal.getMonth() && tahunSaatIni === hariIniReal.getFullYear()) ? 'hari-ini' : '';
        
        let markerHTML = '';
        let namaAcara = '';
        
        if(dataKalender[formatDb]) {
            const acara = dataKalender[formatDb];
            const warnaPenanda = (acara.uid === myUID) ? 'ku' : 'dia';
            markerHTML = `<span class="penanda ${warnaPenanda}"></span>`;
            namaAcara = acara.judul;
        }

        const divTgl = document.createElement('div');
        divTgl.className = `tgl-item ${kelasHariIni}`;
        divTgl.innerHTML = `${i}${markerHTML}`;
        
        // Logika Klik Tanggal Baru (Memanggil Modal Cantik)
                // Logika Klik Tanggal (Tambah / Edit / Hapus)
        divTgl.onclick = (e) => {
            e.stopPropagation(); 
            window.tglPilihanUntukDb = formatDb; 
            
            document.getElementById('modal-kalender-tgl').innerText = `${i} ${namaBulan[bulanSaatIni]} ${tahunSaatIni}`;
            
            if(namaAcara) {
                // JIKA SUDAH ADA ACARA (Mode Edit)
                document.getElementById('modal-kalender-judul').innerText = "Edit / Hapus Jadwal";
                document.getElementById('input-acara-kalender').value = namaAcara; // Munculkan teks lama
                document.getElementById('btn-hapus-kalender').style.display = 'block'; // Munculkan tombol hapus
            } else {
                // JIKA TANGGAL KOSONG (Mode Tambah)
                document.getElementById('modal-kalender-judul').innerText = "Tandai Jadwal";
                document.getElementById('input-acara-kalender').value = ""; // Kosongkan ketikan
                document.getElementById('btn-hapus-kalender').style.display = 'none'; // Sembunyikan tombol hapus
            }
            
            document.getElementById('modal-kalender').style.display = 'flex';
            setTimeout(() => document.getElementById('input-acara-kalender').focus(), 100);
        };

        grid.appendChild(divTgl);
    }
}

function ubahBulan(arah) {
    bulanSaatIni += arah;
    if(bulanSaatIni < 0) { bulanSaatIni = 11; tahunSaatIni--; }
    if(bulanSaatIni > 11) { bulanSaatIni = 0; tahunSaatIni++; }
    renderKalender();
}

function pantauKalender() {
    let isAwalBuka = true;
    
    database.ref('ruang_rahasia/kalender').on('value', snap => {
        dataKalender = snap.val() || {};
        renderKalender();
        
        // Munculkan Notifikasi jika hari ini ada jadwal
        if(isAwalBuka) {
            const hariIniFormatDb = getTanggalHariIni();
            if(dataKalender[hariIniFormatDb]) {
                kirimPushNotif("Jadwal Penting Hari Ini!", dataKalender[hariIniFormatDb].judul);
                showToast(`Hari ini ada jadwal: ${dataKalender[hariIniFormatDb].judul}`, "success");
                
                simpanHistoriNotif(myUID, "Hari ini ada jadwal penting: " + dataKalender[hariIniFormatDb].judul);
                
            }
            isAwalBuka = false;
        }
    });

    // Deteksi jika pasangan menambah jadwal saat kita sedang buka web
    database.ref('ruang_rahasia/kalender').on('child_added', snap => {
        if(isAwalBuka) return; 
        const data = snap.val();
        
        if(data.uid !== myUID && data.timestamp > (Date.now() - 60000)) {
            kirimPushNotif("Kalender Diperbarui!", `Pasanganmu menambahkan jadwal: ${data.judul}`);
            showToast("Pasanganmu menandai tanggal baru!", "info");
        }
    });
}

// --- FUNGSI PENGIRIMAN PUSH NOTIFIKASI AMAN (VIA CLOUDFLARE) ---
// --- FUNGSI PENGIRIMAN PUSH NOTIFIKASI AMAN (VIA CLOUDFLARE) ---
function kirimPushNotif(judul, isiPesan) {
    // URL Cloudflare Worker milikmu
    const CLOUDFLARE_URL = "https://kita-kita-aja.zulhamdani87160.workers.dev/";

    fetch(CLOUDFLARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: judul, pesan: isiPesan })
    }).then(response => {
        console.log("Sinyal berhasil dikirim ke Cloudflare!");
    }).catch(err => {
        console.log("Gagal menghubungi server:", err);
    });
}



// =====================================================================
// --- FUNGSI TOMBOL DI DALAM MODAL KALENDER ---
// =====================================================================
function tutupModalKalender() {
    document.getElementById('modal-kalender').style.display = 'none';
}

function simpanAcaraKalender() {
    const inputPesan = document.getElementById('input-acara-kalender').value.trim();
    
    if (inputPesan === "") {
        showToast("Jadwal tidak boleh kosong!", "error");
        return;
    }

    const formatDb = window.tglPilihanUntukDb; 
    
    database.ref(`ruang_rahasia/kalender/${formatDb}`).set({
        judul: inputPesan,
        uid: myUID,
        timestamp: Date.now()
    }).then(() => {
        tutupModalKalender();
        showToast("Berhasil menandai kalender!", "success");
        
        simpanHistoriNotif(partnerUID, "Pasanganmu menandai jadwal baru di kalender.");
        
    }).catch(err => {
        showToast("Gagal menyimpan jadwal.", "error");
    });
}

// --- FUNGSI HAPUS JADWAL KALENDER ---
function hapusAcaraKalender() {
    const formatDb = window.tglPilihanUntukDb; 
    
    // Perintah .remove() akan melenyapkan data dari Firebase
    database.ref(`ruang_rahasia/kalender/${formatDb}`).remove()
    .then(() => {
        tutupModalKalender();
        showToast("Jadwal berhasil dihapus dari kalender.", "info");
    }).catch(err => {
        showToast("Gagal menghapus jadwal.", "error");
    });
}


// Jalankan kalender saat web pertama kali dirender
renderKalender();



// =====================================================================
// --- SISTEM HISTORI NOTIFIKASI DALAM WEB (LONCENG) ---
// =====================================================================

// Fungsi untuk mencatat histori ke Firebase
function simpanHistoriNotif(uidTarget, pesan) {
    if(!uidTarget) return;
    database.ref(`ruang_rahasia/notifikasi_histori/${uidTarget}`).push({
        pesan: pesan,
        timestamp: Date.now(),
        dibaca: false
    });
}

// Fungsi untuk menarik histori dan memantau titik merah
function pantauHistoriNotifikasi() {
    database.ref(`ruang_rahasia/notifikasi_histori/${myUID}`).orderByChild('timestamp').on('value', snap => {
        const wadah = document.getElementById('daftar-notifikasi');
        const titikMerah = document.getElementById('titik-merah-notif');
        if (!wadah) return;

        wadah.innerHTML = '';
        let adaBelumDibaca = false;

        if(snap.exists()) {
            const dataNotif = [];
            snap.forEach(child => { dataNotif.push({ id: child.key, ...child.val() }); });
            
            // Urutkan dari yang terbaru (dibalik)
            dataNotif.reverse().forEach(notif => {
                if(!notif.dibaca) adaBelumDibaca = true;
                
                // Format Waktu (Contoh: 14:05 - 15 Jun)
                const tgl = new Date(notif.timestamp);
                const stringWaktu = `${tgl.getHours().toString().padStart(2,'0')}:${tgl.getMinutes().toString().padStart(2,'0')} - ${tgl.getDate()}/${tgl.getMonth()+1}`;

                wadah.innerHTML += `
                    <div class="item-notif ${notif.dibaca ? '' : 'belum-baca'}">
                        ${notif.pesan}
                        <span class="waktu-notif">${stringWaktu}</span>
                    </div>
                `;
            });
        } else {
            wadah.innerHTML = '<p class="notif-kosong">Belum ada catatan memori.</p>';
        }

        // Tampilkan/sembunyikan titik merah
        titikMerah.style.display = adaBelumDibaca ? 'block' : 'none';
    });
}

// Fungsi Buka & Tutup Panel
function bukaPanelNotifikasi() {
    document.getElementById('panel-notifikasi').classList.add('buka');
    
    // Ubah status semua notifikasi menjadi "Sudah Dibaca" di Firebase
    database.ref(`ruang_rahasia/notifikasi_histori/${myUID}`).once('value', snap => {
        snap.forEach(child => {
            if(!child.val().dibaca) {
                database.ref(`ruang_rahasia/notifikasi_histori/${myUID}/${child.key}`).update({ dibaca: true });
            }
        });
    });
}
function tutupPanelNotifikasi() { document.getElementById('panel-notifikasi').classList.remove('buka'); }
