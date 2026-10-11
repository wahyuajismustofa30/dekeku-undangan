import dekeku, { dekekuFunction as _dF } from "https://cdn.jsdelivr.net/gh/wahyuajismustofa/dekeku@fd1fd81f4c842a66d71a5cc578291a8b19db20ba/assets/js/dekeku.js";
export {dekeku};

let fileName;
let filePesan = {};
let setUndangan;

export async function init(){
  try{
    setUndangan = dekeku_tmp.set.undangan;
    fileName = setUndangan.fileName;
    await _dF.waitUntilTrue(() => typeof dekeku !== "undefined" && dekeku.ready === true);
    dekeku.params = _dF.readURLParams();
    dekeku.params_1 = _dF.params.getParams();
    _dF.initDekeku();
    await initSeller();
    await initUndangan();

  }catch (err) {
      console.error("❌ Gagal:", err.message);
  }
}

async function initSeller(){
  let sellerId;

  if (typeof window.dekeku_tmp.sellerId !== "undefined"){
    sellerId = window.dekeku_tmp.sellerId;
  }else if (typeof dekeku.params.sellerId !== "undefined"){
    sellerId = dekeku.params.sellerId;
  }else{
    sellerId = 1;
  }

  let sellerFilter = { id : sellerId };
  let fileSeller = {file: "data.seller", nama: "seller", obj:true, filter:{ [Object.keys(sellerFilter)] : sellerFilter[Object.keys(sellerFilter)] }, repo:{username:"wahyuajismustofa",repo:"dekeku"}};
  _dF.pushUniqueObj(dekeku.daftarJson,"nama",fileSeller);
  await _dF.loadAllData();
  await configDataSeller(sellerFilter,fileSeller);
  await _dF.updateDataAtt("dekeku_data_seller", dekeku.dataJson[fileSeller.nama]);
  setFavicon(dekeku.dataJson.seller.favicon);
}

async function configDataSeller(sellerFilter , fileSeller) {
  let sellerSaved = dekeku.dataJson.seller[Object.keys(sellerFilter)];
  let sellerWritten = sellerFilter[Object.keys(sellerFilter)];
  let dataValid = sellerSaved === sellerWritten;
  if(!dataValid){
    sessionStorage.clear();
    let index = dekeku.daftarJson.findIndex(item => item.nama === "seller");
    dekeku.daftarJson[index] = fileSeller;
    delete dekeku.dataJson[fileSeller.nama];
    await _dF.loadAllData();
  }
  dekeku.dataJson[fileSeller.nama] = _dF.flattenWithPrefix(dekeku.dataJson[fileSeller.nama],"sosialMedia");
}

function setFavicon(url) {
  const oldIcon = document.querySelector("link[rel='icon']");
  if (oldIcon) {
    oldIcon.parentNode.removeChild(oldIcon);
  }

  const link = document.createElement("link");
  link.rel = "icon";
  link.href = url;
  document.head.appendChild(link);
}

export async function initUndangan(){
  dekeku.prosesJs += 1;
  filePesan = {file:`${fileName}.pesan`, nama: "pesan"};
  _dF.pushUniqueObj(dekeku.daftarJson,"nama",filePesan);
  await _dF.loadAllData();

  if(typeof dekeku.params_1.to === "undefined" ){
    dekeku.params_1.to = dekeku.dataJson.seller.nama;
    _dF.params.setParam("to", dekeku.params_1.to);
  }

  gantiIsiClass("nama",dekeku.params_1.to);
  initFormKomentar();
  _dF.initDekeku();
  dekeku.prosesJs -= 1;
}

function gantiIsiClass(className, nilaiBaru) {
  const elemenList = document.querySelectorAll('.data-' + className);

  if (elemenList.length === 0) {
    console.warn(`Tidak ditemukan elemen dengan class '${className}'`);
    return;
  }

  elemenList.forEach(el => {
  if (typeof nilaiBaru === 'string' || typeof nilaiBaru === 'number') {
    el.textContent = String(nilaiBaru);
  } else {
    console.warn('Nilai harus berupa string atau angka.');
  }
  });

}

// ==================== PESAN ====================
function initFormKomentar(){
  renderPesan();
  dekeku.proxy[filePesan.nama] = _dF.makeFlagProxy(renderPesan);
  const commentForm = document.getElementById("form-rsvp-pesan");
  if (!commentForm) return;
  commentForm.setAttribute("data-aksi", "github-post");
  commentForm.setAttribute("data-dekeku_proxy", true);
  commentForm.setAttribute("data-file", `${filePesan.file}`);
  
  const inputNamaTamu = document.createElement("input");
  inputNamaTamu.type = "hidden";
  inputNamaTamu.name = "nama";
  inputNamaTamu.value = dekeku.params_1.to;

  const inputWaktu = document.createElement("input");
  inputWaktu.type = "hidden";
  inputWaktu.name = "waktu";
  inputWaktu.setAttribute("data-type", "timestamp");

  commentForm.appendChild(inputNamaTamu);
  commentForm.appendChild(inputWaktu);
}

function buatCard(pesan) {
  const card = document.createElement("div");
  card.className = "card p-3 text-center radius-10 card-undangan mt-4";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-duration", "2000");

  card.innerHTML = `
    <h6 class="mb-0">${pesan.nama}</h6><span>${pesan.kehadiran}</span>
    <hr/> ${pesan.pesan}
    <div class="mt-4">${formatTanggalIndonesia(pesan.waktu)}</div>
  `;
  return card;
}

let pesanDataGlobal = [];
let pesanIndex = 0;
const pesanPerPage = 4; // Jumlah pesan yang ditampilkan per batch

function renderPesan(targetWrapperId = "pesan") {
    let data = dekeku.dataJson.pesan;
    if (Object.keys(data).length === 0) return;
  const wrapper = document.getElementById(targetWrapperId);
  if (!wrapper) return console.error(`Elemen dengan ID '${targetWrapperId}' tidak ditemukan.`);

  const container = wrapper.querySelector(".container");
  if (!container) return console.error(".container tidak ditemukan di dalam #" + targetWrapperId);

  const isGrid = container.classList.contains("grid");
  const isFlat = container.classList.contains("flat");

  // Urutkan dari terbaru ke terlama
  pesanDataGlobal = [...data].sort((a, b) => new Date(b.waktu) - new Date(a.waktu));
  pesanIndex = 0;
  
  container.innerHTML = "";
  tampilkanPesan(container, isGrid, isFlat, wrapper);
}

function tampilkanPesan(container, isGrid, isFlat, wrapper) {
  const nextBatch = pesanDataGlobal.slice(pesanIndex, pesanIndex + pesanPerPage);
  pesanIndex += nextBatch.length;

  if (isGrid) {
    let row = container.querySelector(".row");
    if (!row) {
      row = document.createElement("div");
      row.className = "row justify-content-center";
      container.appendChild(row);
    }

    nextBatch.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";
      col.appendChild(buatCard(p));
      row.appendChild(col);
    });

  } else if (isFlat) {
    nextBatch.forEach(p => container.appendChild(buatCard(p)));
  }

  // Tampilkan atau sembunyikan tombol
  let btn = wrapper.querySelector("#btnLihatLebih");

  if (pesanIndex < pesanDataGlobal.length) {
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "btnLihatLebih";
      btn.className = "btn btn-primary d-block mx-auto mt-4";
      btn.textContent = "Tampilkan Lebih Banyak";
      btn.addEventListener("click", () => tampilkanPesan(container, isGrid, isFlat, wrapper));
      wrapper.appendChild(btn);
    } else {
      btn.style.display = "block";
    }
  } else {
    if (btn) btn.remove();
  }
}

function formatTanggalIndonesia(isoString) {
  const t = new Date(isoString);

  const hari    = t.toLocaleDateString("id-ID", { weekday: "short" }); // Sen, Sel, Rab, dst.
  const tanggal = t.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  const waktu   = t.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" });

  return `${hari}, ${tanggal} ${waktu} WIB`;
}


