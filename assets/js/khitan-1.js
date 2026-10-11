let preview = false;
let namaTamu = "DEKEKU";
let data = {};
  // nama Tamu
  function getParams(name) {
    const url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results || !results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  const paramNama = getParams("to");
  
  if (paramNama) {
    namaTamu = paramNama.replace(/[-_]/g, " ");
  } else {
    preview = true;
  }

  document.querySelectorAll(".e-nama").forEach(el => {
    el.textContent = namaTamu;
  });

// form handler
const SCRIPT_BASE_URL = "https://script.google.com/macros/s/AKfycbwZ_spsPzVJ_VC4y_mgYjUvFHYAagYjMseFTODgZUG1QXQZtKdlAxiuaVVXQ4HjaMN8rw/exec";
const DATABASE_NAME = "preview2";

function encodeCustom(text) {
  return text
    .trim()
    .replace(/ /g, "_")
    .replace(/,/g, "--koma--");
}

async function handleFormSubmit(event) {
  const form = event.target;
  event.preventDefault();
  if (typeof namaTamu === 'undefined' || !namaTamu) {
    showAlert('Tamu tidak terdaftar!', "error");
    console.warn('namaTamu tidak ditemukan:', namaTamu);
    return;
  }

    // Isi input hidden 'waktu' dengan timestamp saat ini
    const waktuInput = form.querySelector('#input-waktu');
    if (waktuInput) {
    const now = new Date();
    const waktuFormatted = now.toLocaleString("id-ID", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
    waktuInput.value = waktuFormatted;
    }

  const formData = new FormData(form);
  const updateFields = [];

  for (const [name, value] of formData.entries()) {
    const key = encodeCustom(name);
    const val = encodeURIComponent(encodeCustom(value));
    updateFields.push(`${key}=${val}`);
  }

  const query = `UPDATE tamu SET ${updateFields.join(",")} WHERE nama=${encodeCustom(namaTamu)}`;
  const url = `${SCRIPT_BASE_URL}?conn=DATABASE=${DATABASE_NAME}&data=${query}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result.status === true) {
    showAlert("Data berhasil dikirim. Terima kasih!", "success");
    } else {
      showAlert("Gagal menyimpan data. Silakan coba lagi.", "error");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    showAlert("Terjadi kesalahan saat mengirim data.", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-doa");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const doaInput = form.querySelector('[name="doa"]');
      const kehadiranInput = form.querySelector('[name="kehadiran"]:checked');

      // Validasi isi doa
      if (!doaInput || !doaInput.value.trim()) {
        showAlert("Mohon isi Pesan terlebih dahulu.", "warning");
        return;
      }

      // Validasi pilihan kehadiran
      if (!kehadiranInput) {
        showAlert("Mohon pilih status kehadiran.", "warning");
        return;
      }
      showAlert("Mengirim data", "info");
      // Lanjutkan ke fungsi submit utama
      handleFormSubmit(event);
    });
  }
});


function showAlert(pesan, status = "info") {
  // Cek atau buat container
  let container = document.getElementById("alert-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "alert-container";
    document.body.appendChild(container);
  }

  // Tentukan class status
  let statusClass = "alert-info";
  if (status === "success") statusClass = "alert-success";
  else if (status === "error" || status === "danger") statusClass = "alert-error";
  else if (status === "warning") statusClass = "alert-warning";

  // Jika sudah ada alert aktif, ganti kontennya
  let existing = container.querySelector(".alert-active");
  if (existing) {
    existing.textContent = pesan;
    existing.className = `alert-active ${statusClass}`;
    // Reset ulang timer hilang
    clearTimeout(existing.dataset.timeout);
    const timeoutId = setTimeout(() => {
      existing.style.opacity = "0";
      setTimeout(() => existing.remove(), 300);
    }, 5000);
    existing.dataset.timeout = timeoutId;
    return;
  }

  // Buat elemen alert baru
  const alert = document.createElement("div");
  alert.className = `alert-active ${statusClass}`;
  alert.textContent = pesan;
  container.appendChild(alert);
  // Fade in
  requestAnimationFrame(() => {
    alert.style.opacity = "1";
  });
  // Auto-remove setelah 5 detik
  const timeoutId = setTimeout(() => {
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 300);
  }, 5000);
  alert.dataset.timeout = timeoutId;
}

// showAlert("Data berhasil dikirim", "success");
// showAlert("Gagal menyimpan data", "error");
// showAlert("Silakan isi semua form", "warning");
// showAlert("Info tambahan untuk pengguna");

// fungsi get data tamu
async function getData(namaFile) {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`/assets/data/${namaFile}.json?t=${timestamp}`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    return await response.json();
  } catch (err) {
    console.error("Error:", err.message);
    return {};
  }
}
async function init() {
  try {
    data = await getData('preview-tamu-khitan');

    if (Array.isArray(data.tamu) && data.tamu.length > 0) {
      renderDoaCards(data.tamu);
    } else {
      console.warn("Data kosong atau tidak valid.");
    }

  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }

}



// fungsi render doa cards

let allDoaData = [];
let displayedCount = 0;
const perPage = 4;

async function renderDoaCards(data) {
  const container = document.querySelector("#data-doa .container");
  if (!container) return console.error("Elemen container tidak ditemukan.");

  const isRowBased = container.querySelector(".row");
  const targetContainer = isRowBased ? container.querySelector(".row") : container;

  targetContainer.innerHTML = "";
  allDoaData = [...data].reverse(); // urut dari terbaru
  displayedCount = 0;

  // tampilkan batch awal
  loadMoreDoa(targetContainer, isRowBased);

  // Tampilkan atau sembunyikan tombol tergantung sisa data
  const loadMoreBtn = document.getElementById("btn-load-more");
  if (loadMoreBtn) {
    if (allDoaData.length > perPage) {
      loadMoreBtn.style.display = "block";
      loadMoreBtn.onclick = () => loadMoreDoa(targetContainer, isRowBased);
    } else {
      loadMoreBtn.style.display = "none";
    }
  }
}

function loadMoreDoa(container, isRowBased) {
  const slice = allDoaData.slice(displayedCount, displayedCount + perPage);
  const html = slice.map((item, index) => {
    const nama = item.nama || "Tamu";
    const pesan = item.pesan || "-";
    const waktu = item.waktu || "-";
    const kehadiran = item.kehadiran || "Tidak diketahui";

    const labelClass = kehadiran.toLowerCase().includes("hadir")
      ? "label-hadir"
      : "label-tidak";

    const card = `
      <div class="doa-chat card card-undangan mt-3 p-3">
        <div class="doa-nama fw-bold mb-1">${nama}</div>
        <div class="doa-isi mb-2">${pesan}</div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="doa-kehadiran ${labelClass}">${kehadiran}</span>
          <small class="doa-waktu text-muted">${waktu}</small>
        </div>
      </div>`;

    return isRowBased ? `<div class="col-lg-12">${card}</div>` : card;
  }).join("");

  container.insertAdjacentHTML("beforeend", html);
  displayedCount += slice.length;

  // Jika semua data sudah ditampilkan, sembunyikan tombol
  const btn = document.getElementById("btn-load-more");
  if (btn && displayedCount >= allDoaData.length) {
    btn.style.display = "none";
  }
}


// fungsi render rekening
function renderRekeningList() {
  const container = document.getElementById("daftar-rekening");
  if (!container || !Array.isArray(window.bank)) return;

  const cards = window.bank.map(item => {
    return `
      <div class="card card-body mt-4 text-center">
        <img alt="${item.bank}" class="img-fluid w-100 rounded" src="${item.gambar}" />
        <div class="text-center mt-3">
          <strong class="text-dark">Nama Bank</strong>
          <p class="text-center">${item.bank} An ${item.atas_nama}</p>
          <strong class="text-dark">Nomor Rekening</strong>
          <p class="text-center">${item.nomor}</p>
          <button class="btn btn-primary" onclick="salinRekening('${item.nomor}')">
            <i class="fas fa-copy"></i> Copy Rekening
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = cards;
}

function salinRekening(nomor) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(nomor).then(() => {
      showAlert("Nomor rekening disalin!", "success");
    }).catch(err => {
      console.error("Gagal menyalin:", err);
      showAlert("Gagal menyalin nomor rekening.", "error");
    });
  } else {
    // fallback untuk browser lama
    const tempInput = document.createElement("input");
    tempInput.value = nomor;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showAlert("Nomor rekening disalin!", "success");
    } catch (err) {
      console.error("Fallback copy gagal:", err);
      showAlert("Gagal menyalin nomor rekening.", "error");
    }
    document.body.removeChild(tempInput);
  }
}


// Inisialisasi

document.addEventListener("DOMContentLoaded", renderRekeningList);
init();