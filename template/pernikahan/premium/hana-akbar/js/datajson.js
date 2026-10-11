//params
function getParam(variabel) {
  const params = new URLSearchParams(window.location.search);
  const nilai = params.get(variabel);
  return nilai ? nilai.replace(/_/g, ' ') : null;
}

// variabel global
const namaTamu = getParam("to");
const SCRIPT_BASE_URL = "https://script.google.com/macros/s/AKfycbwZ_spsPzVJ_VC4y_mgYjUvFHYAagYjMseFTODgZUG1QXQZtKdlAxiuaVVXQ4HjaMN8rw/exec";
const DATABASE_NAME = "bulan-bintang"; 
let data_update;
let data;

async function init() {
  data = await getData('tamu');
  data_update = data.updated;
  if (data && Array.isArray(data.tamu)) {
  gantiIsiClass("nama", namaTamu);
  buatKomentarDariData();
  document.body.classList.remove("imp-hidden");
  tampilkanRSVP();
  initGiftFormHandler();
  initCommentFormHandler();
  }
}

async function getData(namaFile) {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`./data/${namaFile}.json?t=${timestamp}`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    return await response.json();
  } catch (err) {
    console.error("Error:", err.message);
    return {};
  }
}

async function updateData() {
  try {
    const dataBaru = await getData('tamu');
    if (dataBaru.updated && dataBaru.updated != data_update) {
      showAlert("info", "Perubahan data terdeteksi. Memuat ulang halaman...");
      window.location.reload();
    }
  } catch (err) {
    console.error("Gagal memeriksa pembaruan data:", err.message);
  }
}
