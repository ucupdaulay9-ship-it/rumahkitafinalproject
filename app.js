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
        // Tampilkan data user di halaman Account
        document.getElementById("userName").innerText = user.displayName;
        document.getElementById("userPhoto").src = user.photoURL;
    } else {
        // Jika tidak ada user login, tendang balik ke login
        window.location.href = "index.html";
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
}
