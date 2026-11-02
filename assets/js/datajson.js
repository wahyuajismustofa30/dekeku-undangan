const _fileName = 'preview-undangan-pernikahan';
const _urlApi = "https://api.dekeku.my.id";
const waNumber = "6285161517176";

// variabel global
const namaTamu = getParam("to");
let data_update;
let config = {};
let data;

async function init() {
  config = await getConfig();
  data = await getData(_fileName);
  data_update = data.updated;
  if (data && Array.isArray(data.tamu)) {
    // buatKomentarDariData();
    // document.body.classList.remove("imp-hidden");
    // tampilkanRSVP();
    // initGiftFormHandler();
    // initCommentFormHandler();
  }
}

async function getData(namaFile) {
  try {
    const res = await fetch(`${config.url}/assets/data/${namaFile}.json?time=${new Date()}`);
    const response = await res.json();
    return response;
  } catch (err) {
    console.error("Error:", err.message);
    return {};
  }
}

async function getConfig() {
  try {
    const response = await fetch(`/config.json`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    let res = await response.json();
    return res.repository;
  } catch (err) {
    console.error("Error:", err.message);
    return {};
  }
}

function getParam(variabel) {
  const params = new URLSearchParams(window.location.search);
  const nilai = params.get(variabel);
  return nilai ? nilai.replace(/_/g, ' ') : null;
}

// rsvp ---------------------------------------
function buatFormRSVP() {
  return `
    <form data-aksi="github-post" data-file="${_fileName}.tamu">
      <!-- Status -->
      <div class="rsvp-status-wrap">
        <div class="rsvp-status-head" data-aos="fade-up" data-aos-duration="1200">
          <p class="rsvp-status-caption">Apakah kamu datang?</p>
        </div>
        <div class="rsvp-status-body">
          <div class="rsvp-confirm-wrap">
            <label data-aos="fade-up" data-aos-duration="1200">
              <input type="radio" name="rsvp_status" value="Hadir">
              <div class="rsvp-confirm-btn going">Hadir</div>
            </label>
            <label data-aos="fade-up" data-aos-duration="1200">
              <input type="radio" name="rsvp_status" value="Tidak Hadir">
              <div class="rsvp-confirm-btn not-going">Tidak Hadir</div>
            </label>
          </div>
        </div>
      </div>

      <!-- Session -->
        <div class="rsvp-session-wrap" id="rsvp-session">
          <div class="session-caption-wrap">
            <p class="caption" data-aos="fade-up" data-aos-duration="1200">Acara mana yang akan Anda hadiri?</p>
          </div>
          <div class="session-btn-wrap">
            <label data-aos="fade-up" data-aos-duration="1200">
              <input type="checkbox" name="acara" value="Akad_Nikah">
              <div class="rsvp-session-btn">Akad Nikah</div>
            </label>
            <label data-aos="fade-up" data-aos-duration="1200">
              <input type="checkbox" name="acara" value="Resepsi">
              <div class="rsvp-session-btn">Resepsi</div>
            </label>
          </div>
        </div>
        <input type="hidden" name="nama" value="${namaTamu}">
      <!-- Submit -->
      <div class="rsvp-confirm-wrap" data-aos="fade-up" data-aos-duration="1200">
        <button type="submit" class="rsvp-confirm-btn confirm submit">Konfirmasi</button>
      </div>
    </form>
  `;
}

function buatPesanHadir() {
  return `
    <div class="rsvp-message-wrap going" data-aos="fade-up" data-aos-duration="1200">
      <div class="rsvp-message-content">
        <h4 class="rsvp-message-title">Hadir</h4>
        <p class="rsvp-message-caption">Yeyy, terimakasiih sudah mau datang... <br> Sampai jumpa disana ;)</p>
      </div>
    </div>
    <div class="rsvp-change-wrap" data-aos="fade-up" data-aos-duration="1200">
      <div class="rsvp-confirm-wrap">
        <button class="rsvp-confirm-btn confirm" id="changeRSVP">Ubah</button>
      </div>
    </div>
  `;
}

function buatPesanTidakHadir() {
  return `
    <div class="rsvp-message-wrap not-going" data-aos="fade-up" data-aos-duration="1200">
      <div class="rsvp-message-content">
        <h4 class="rsvp-message-title">Tidak Hadir</h4>
        <p class="rsvp-message-caption">Terima kasih atas konfirmasinya. Semoga kita bisa bertemu di lain kesempatan 😊</p>
      </div>
    </div>
    <div class="rsvp-change-wrap" data-aos="fade-up" data-aos-duration="1200">
      <div class="rsvp-confirm-wrap">
        <button class="rsvp-confirm-btn confirm" id="changeRSVP">Ubah</button>
      </div>
    </div>
  `;
}

async function tampilkanRSVP() {
  const container = document.getElementById("rsvpContainer");

  if (!namaTamu || !data.tamu || !container) return;

  const tamu = data.tamu.find(item => item.nama == namaTamu);
  if (!tamu) {
    container.innerHTML = buatFormRSVP();
    initRSVPFormHandler();
    return;
  }

  if (tamu.kehadiran === "Hadir") {
    container.innerHTML = buatPesanHadir();
  } else if (tamu.kehadiran === "Tidak Hadir") {
    container.innerHTML = buatPesanTidakHadir();
  } else {
    container.innerHTML = buatFormRSVP();
    initRSVPFormHandler();
  }
  
  container.addEventListener("click", function (e) {
  if (e.target && e.target.id === "changeRSVP") {
    container.innerHTML = buatFormRSVP();
    initRSVPFormHandler();
  }
  });
}

function initRSVPFormHandler() {
  const form = document.getElementById("RSVPForm");
    if (!form) {
    console.error("Form #RSVPForm tidak ditemukan");
    return;
  }

  form.addEventListener("submit", handleFormRSVP);
  initAttendanceToggle();
}

async function handleFormRSVP(event) {
  event.preventDefault();
  const form = document.getElementById("RSVPForm");
  const selectedKehadiran = document.querySelector('input[name="rsvp_status"]:checked');
  const kehadiran = selectedKehadiran ? selectedKehadiran.value : null;
  if (!kehadiran){ return showAlert("Silakan pilih status kehadiran.", "error")};
  if (!namaTamu){ return showAlert("Mohon buka undangan melalui link yang valid.", "error")};
  const eventCheckboxes = document.querySelectorAll('input[name="selected_event[]"]:checked');
  const values = Array.from(eventCheckboxes).map(cb => cb.value);
  const acara = values.length > 0 ? encodeCustom(values.join(", ")) : "Tidak memilih acara";

  try {
    const payload = {
      detailFile: `${_fileName}.tamu`,
      query: {nama: namaTamu},
      newData: {nama: namaTamu, kehadiran:kehadiran, acara: acara}
    };
    form.reset();
    showAlert("Mengirim data RSVP", "info");
    const res = await fetch(`${_urlApi}/gh/data?action=update_or_add`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      result = await res.json();
      data = await result.data;
  if (result.status){
    showAlert("RSVP berhasil dikirim!", "success");
    tampilkanRSVP();
  }else{
    showAlert(result.error, "error");
  }
  } catch (err) {
    console.error("Gagal mengirim RSVP:", err);
  showAlert("Gagal mengirim data. Silakan coba lagi.", "error");
  }
}

function initAttendanceToggle() {
  const radios = document.querySelectorAll('input[name="rsvp_status"]');
  const acara = document.getElementById('rsvp-session');

  if (!acara || radios.length === 0) return;

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === "Tidak Hadir" && radio.checked) {
        acara.style.display = "none";
      } else if (radio.value === "Hadir" && radio.checked) {
        acara.style.display = "";
      }
    });
  });
}

// kado ---------------------------------------
function initGiftFormHandler() {
  const form = document.getElementById("weddingGiftForm");
    if (!form) {
    return;
  }

  form.addEventListener("submit", handleFormGift);
}

async function handleFormGift(event) {
  event.preventDefault();
  const form = document.getElementById("weddingGiftForm");
  const akun = encodeCustom(form.querySelector('[name="account_name"]').value.trim());
  const pesan = encodeCustom(form.querySelector('[name="message"]').value.trim());
  const nominal = encodeCustom(form.querySelector('[name="amount"]').value.trim());

  if (!akun || !pesan || !nominal) {
    return alert("Silakan lengkapi data kado");
  }

  // Buat pesan WhatsApp dengan format detail kado
  const waMessage = encodeURIComponent(
    `Konfirmasi Kado Pernikahan:\n` +
    `Akun: ${akun}\n` +
    `Nominal: ${nominal}\n` +
    `Pesan: ${pesan}`
  );

  // Buat URL WhatsApp API (web)
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  try {
    window.open(waUrl, "_blank");
  } catch (err) {
    console.error("Gagal mengirim detail kado ke WhatsApp:", err);
    showAlert("Gagal membuka WhatsApp. Silakan coba lagi.", "error");
  }
}

// komentar -----------------------------------
function initCommentFormHandler() {
  const form = document.getElementById("weddingWishForm");
    if (!form) {
    console.error("Form #weddingWishForm tidak ditemukan");
    return;
  }

  form.addEventListener("submit", handleFormComment);
}

async function handleFormComment(event) {
  event.preventDefault();
  const form = document.getElementById("weddingWishForm");
  const pesanWrap = document.querySelector('textarea[name="comment"]');
  if (!pesanWrap){ return showAlert("Pesan tidak boleh kosong.", "error")};
  if (!namaTamu){ return showAlert("Mohon buka undangan melalui link yang valid.", "error")};
  const komentar = pesanWrap.value;
  if (!komentar) return alert("Silakan isi pesan anda.");

  try {
    
    let waktu = new Date().toISOString();
    const payload = {
      detailFile: `${_fileName}.pesan`,
      newData: {nama: namaTamu, pesan : komentar, waktu : waktu}
    };
    form.reset();
    showAlert("Mengirim data Pesan", "info");
    const res = await fetch(`${_urlApi}/gh/data?action=post`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      result = await res.json();
      data = await result.data;
      if (result.status){
        showAlert("Pesan berhasil dikirim!", "success");
        buatKomentarDariData();
      }else{
        showAlert(result.error, "error");
      }      
  } catch (err) {
    console.error("Gagal mengirim Pesan:", err);
  showAlert("Gagal mengirim data. Silakan coba lagi.", "error");
  }
}


async function buatKomentarDariData() {
  if (!data || !Array.isArray(data.pesan)) return;

  const komentarContainer = document.getElementById("comment-container");
  if (!komentarContainer) {
    console.warn("Elemen container komentar tidak ditemukan.");
    return;
  }
  
  const komentarList = data.pesan
    .map((tamu, idx) => ({...tamu, _idx: idx}))
    .filter(tamu => tamu.pesan && tamu.pesan.trim() !== "")
    .reverse();
  let loadedCount = 0;
  const batchSize = 5;

  komentarContainer.innerHTML = "";

  const existingBtn = document.getElementById("moreComment");
  if (existingBtn) existingBtn.remove();

  function renderBatch() {
    const end = Math.min(loadedCount + batchSize, komentarList.length);
    for (let i = loadedCount; i < end; i++) {
      const tamu = komentarList[i];
      const item = document.createElement("div");
      item.className = "comment-item aos-init aos-animate";
      item.id = `comment${tamu.id || i}`;
      item.setAttribute("data-aos", "fade-up");
      item.setAttribute("data-aos-duration", "1200");
      item.style.opacity = "1";
      item.style.transitionDuration = "1200ms";

      const nama = tamu.nama || "Tamu";
      const tanggal = formatTanggal(tamu["waktu"]);
      const pesan = tamu.pesan;

      item.innerHTML = `
        <div class="comment-head">
          <h3 class="comment-name">${escapeHtml(nama)}</h3>
          <small class="comment-date">${tanggal}</small>
        </div>
        <div class="comment-body">
          <p class="comment-caption">${escapeHtml(pesan)}</p>
        </div>
      `;

      komentarContainer.appendChild(item);
    }
    loadedCount = end;

    if (loadedCount < komentarList.length) {
      let btn = document.getElementById("moreComment");
      if (!btn) {
        btn = document.createElement("button");
        btn.id = "moreComment";
        btn.className = "comment-loadmore-btn";
        btn.textContent = "Tampilkan lebih banyak";
        komentarContainer.parentNode.appendChild(btn);
        btn.addEventListener("click", function() {
          renderBatch();
          btn.scrollIntoView({behavior: "smooth", block: "end"});
        });
      }
      btn.style.display = "block";
    } else {
      const btn = document.getElementById("moreComment");
      if (btn) btn.style.display = "none";
    }
  }

  renderBatch();
}
// Format ISO date ke "dd MMM yyyy, HH:mm"
function formatTanggal(isoString) {
  if (!isoString) return "-";
  const tanggal = new Date(isoString);
  return tanggal.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Escape HTML untuk keamanan
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
// alert
function showAlert(pesan, status) {
  const alertBox = document.getElementById("alert");
  const alertText = alertBox.querySelector(".alert-text");
  const alertClose = alertBox.querySelector(".alert-close");

  // Reset dulu
  alertBox.className = `alert show ${status}`;
  alertText.textContent = pesan;

  // Hapus sebelumnya kalau ada
  if (alertBox._timeoutId) clearTimeout(alertBox._timeoutId);

  // Tutup otomatis setelah 5 detik
  alertBox._timeoutId = setTimeout(() => {
    closeAlert();
  }, 5000);

  // Klik tombol X untuk menutup
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

// tools
function encodeCustom(text) {
  return text
    .replace(/ /g, "_")
    .replace(/,/g, "--koma--");
}

window.alert = function(message) {
  showAlert(message, "error");
};

// init();
