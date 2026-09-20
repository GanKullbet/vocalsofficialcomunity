// ===== BACKGROUND MUSIC =====
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

// Atur volume (0.0 - 1.0)
music.volume = 0.45;

// Fungsi untuk memutar musik
function playMusic() {
  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊';
      })
      .catch((error) => {
        console.log('Autoplay diblokir browser:', error);
        isPlaying = false;
        musicToggle.textContent = '🔇';
      });
  }
}

// Coba autoplay saat halaman selesai dimuat
window.addEventListener('load', () => {
  playMusic();
});

// Tombol Mute / Unmute
musicToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // biar tidak bentrok dengan klik body

  if (isPlaying) {
    music.pause();
    musicToggle.textContent = '🔇';
    isPlaying = false;
  } else {
    playMusic();
  }
});

// Jika autoplay gagal, musik akan mulai saat user klik di mana saja
document.body.addEventListener('click', () => {
  if (!isPlaying) {
    playMusic();
  }
}, { once: true });