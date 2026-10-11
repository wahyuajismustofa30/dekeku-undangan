// ==================== VARIABEL ====================
let paramNama = "";
let namaTamu = "";
let dataUndangan = {};
let myAudio = null;


// ==================== INISIALISASI ====================
async function init(){
    setupSmoothScroll(".link", start);
    scrollToTop();    
}

// ==================== MUSIC CONTROL ====================
function start() {
  $(".hidden, .navbar, .button-menu, #musik").css("display", "block");
  $("body").css({ overflow: "auto", height: "auto" });

  myAudio = document.getElementById("audio");
  if (!myAudio) return;

  // Hanya mainkan jika belum main
  if (myAudio.paused || myAudio.ended) {
    myAudio.play();
  }
}

function updateMuteIcon(isMuted) {
  const muteBtn = document.getElementById("musik");
  if (!muteBtn) return;

  muteBtn.innerHTML = isMuted
    ? '<i class="fas fa-volume-xmark"></i>'
    : '<i class="fas fa-volume-high"></i>';
}


function toggleAudio() {
  if (!myAudio) return;

  if (myAudio.paused || myAudio.ended) {
    playAudio();
  } else {
    pauseAudio();
  }
}


function playAudio() {
  if (!myAudio) return;

  if (myAudio.paused || myAudio.ended) {
    myAudio.play();
  }

  if (myAudio.muted) {
    myAudio.muted = false;
    updateMuteIcon(false);
  }
  // Cek ketersediaan YT dan YT.PlayerState sebelum akses
  if (window.YT && YT.PlayerState && Array.isArray(ytPlayers)) {
    ytPlayers.forEach(player => {
      if (player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      }
    });
  }
}

function pauseAudio() {
  if (!myAudio) return;

  if (!myAudio.paused) {
    myAudio.pause();
  }

  if (!myAudio.muted) {
    myAudio.muted = true;
    updateMuteIcon(true);
  }
}

// ==================== COPY TO CLIPBOARD ====================
 function copy() {
 var isi = $("#myInput1").val();
 var $temp = $("<input>");
 $("body").append($temp);
 $temp.val(isi).select();
 document.execCommand("copy");
 $temp.remove();
 showAlert("Nomor Rekening Tersalin :" + isi, "success");
 }

 // ==================== COUNTDOWN ====================
function initCountdown(targetDate) {
  const countDownDate = new Date(targetDate).getTime();

  const elDays = document.getElementById("days");
  const elHours = document.getElementById("hours");
  const elMinutes = document.getElementById("minutes");
  const elSeconds = document.getElementById("seconds");
  const elText = document.getElementById("hitung-mundur");

  const hasGrid = elDays && elHours && elMinutes && elSeconds;
  const hasText = elText;

  if (!hasGrid && !hasText) {
    console.warn("Tidak ada elemen countdown yang ditemukan.");
    return;
  }

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(interval);

      if (hasGrid) {
        elDays.innerHTML = `<div class="angka">0</div><div class="label">Hari</div>`;
        elHours.innerHTML = `<div class="angka">0</div><div class="label">Jam</div>`;
        elMinutes.innerHTML = `<div class="angka">0</div><div class="label">Menit</div>`;
        elSeconds.innerHTML = `<div class="angka">0</div><div class="label">Detik</div>`;
      }

      if (hasText) {
        elText.innerText = "EXPIRED";
      }

      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hasGrid) {
      elDays.innerHTML = `<div class="angka">${days}</div><div class="label">Hari</div>`;
      elHours.innerHTML = `<div class="angka">${hours}</div><div class="label">Jam</div>`;
      elMinutes.innerHTML = `<div class="angka">${minutes}</div><div class="label">Menit</div>`;
      elSeconds.innerHTML = `<div class="angka">${seconds}</div><div class="label">Detik</div>`;
    }

    if (hasText) {
      elText.innerText = `${days}h ${hours}j ${minutes}m ${seconds}s`;
    }
  }, 1000);
}


// ==================== FULLSCREEN API ====================
function aktifkanFullscreen(elem = document.documentElement) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen(); // Safari
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();    // Firefox
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();     // IE/Edge
  } else {
    console.warn("Fullscreen API tidak didukung di browser ini.");
  }
}

// ==================== SMOOTH SCROLL ====================
function setupSmoothScroll(selector, musicCallback) {
  document.querySelectorAll(selector).forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);

      if (typeof musicCallback === "function") musicCallback();

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}
// ==================== ALERT HANDLER ====================
function showAlert(pesan, status) {
  let alertBox = document.getElementById("alert");
  
  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.id = "alert";
    alertBox.className = `alert ${status}`;

    alertBox.innerHTML = `
      <div class="alert-text"></div>
      <button class="alert-close" aria-label="Tutup">&times;</button>
    `;
    
    document.body.appendChild(alertBox);
  }

  const alertText = alertBox.querySelector(".alert-text");
  const alertClose = alertBox.querySelector(".alert-close");
  
  alertBox.className = `alert show ${status}`;
  alertText.textContent = pesan;
  
  if (alertBox._timeoutId) clearTimeout(alertBox._timeoutId);
  
  alertBox._timeoutId = setTimeout(() => {
    closeAlert();
  }, 5000);
  
  alertClose.onclick = () => {
    closeAlert();
  };
}

function closeAlert() {
  const alertBox = document.getElementById("alert");
  alertBox.className = "alert hide";
  if (alertBox._timeoutId) {
    clearTimeout(alertBox._timeoutId);
    alertBox._timeoutId = null;
  }
}

// ==================== CUSTOM YOUTUBE EMBED ====================
  let ytPlayers = [];

  function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.video-wrapper').forEach((wrapper, index) => {
      const videoId = wrapper.dataset.videoId;
      const container = wrapper.querySelector('.youtube-container');
      const thumbnail = wrapper.querySelector('.custom-thumbnail');

      const player = new YT.Player(container, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
              thumbnail.style.display = 'flex';
              playAudio();
            } else if (event.data === YT.PlayerState.PLAYING) {
              thumbnail.style.display = 'none';
              pauseAudio();
            }
          }
        }
      });

      ytPlayers.push(player);

      thumbnail.addEventListener('click', () => {
        player.playVideo();
      });
    });
  }

// ==================== SCROLL TO TOP ====================
function scrollToTop() {
  window.scrollTo(0, 0);
}

const bukaBtn = document.getElementById("bukaUndangan");
if (bukaBtn) {
  bukaBtn.addEventListener("click", () => {
    start();
    aktifkanFullscreen();
  });
}



document.addEventListener("DOMContentLoaded", function () {
  init();
});