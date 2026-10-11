import { enrichWithLookups, filterData } from "https://cdn.jsdelivr.net/gh/wahyuajismustofa/dekeku@main/assets/js/utils/jsonHandler.js";
import { wrapElement, getUniqueId } from "https://cdn.jsdelivr.net/gh/wahyuajismustofa/dekeku@main/assets/js/dom/utils.js";

// ================== DATA PRODUK ==================
const file = {file:"produk", nama: "produk", repo:{username:"wahyuajismustofa",repo:"dekeku"}};
let {
  _dekeku,
  _dF,
  dataProduk = [],
  dataKategori = [],
  dataPaket = [],
  dataProdukShow = {},
  filters = {},
  seller,
  params
} = {};

export default async function init() {
  _dekeku = window._dekeku;
  seller = _dekeku.dataJson.seller;
  params = encodeUrlSafe(JSON.stringify({sellerId:seller.id}));
  _dF = _dekeku.function;
  _dF.pushUniqueObj(_dekeku.daftarJson,"nama",file);
  await _dF.loadAllData();
  await renderProdukdanFilter();
}

const keyFilterProduk = ['acara','tema'];
let PRODUK_PER_HALAMAN = 10;


async function renderProdukdanFilter(){
  await getDataProduk();
  filters = _dekeku?.params?.filters || {};
  updateDataProdukShow();
  renderFilters(dataProduk, keyFilterProduk);
  renderProduk(dataProdukShow);
}

async function getDataProduk() {
  dataProduk = _dekeku.dataJson[file.nama].produk;
  dataKategori = _dekeku.dataJson[file.nama].kategori;
  dataPaket = _dekeku.dataJson[file.nama].paket;
  dataProduk = enrichWithLookups(dataProduk, { kategori: dataKategori, paket: dataPaket });
  dataProduk = dataProduk.filter(item => item.kategori === "undangan").map(({kategori,...data}) => data);
}

function updateDataProdukShow() {
  dataProdukShow = filterData(dataProduk, filters);
}


function renderFilters(data, keys) {
  const container = document.querySelector(`[data-element="filter-produk"]`);
  if (!container){
    return;
  }
  const filterId = getUniqueId("filter-produk"); 
  container.id = filterId;

  if (!container.closest('.card')) {
    const wraper1 = document.createElement("div");
    wraper1.className = "card-body shadow-soft border border-light rounded p-1";
    const wraper2 = document.createElement("div");
    wraper2.className = "card bg-primary shadow-inset border-light p-2 mb-4";

    wrapElement(container, wraper1);
    wrapElement(wraper1, wraper2);
  }

  container.innerHTML = "";

  let filteredData = data;

  keys.forEach((key, index) => {
    if (index > 0) {
      const prevKey = keys[index - 1];
      const prevValue = filters[prevKey];
      if (prevValue) {
        filteredData = filteredData.filter(item => item[prevKey] === prevValue);
      }
    }

    if (!filteredData.some(item => key in item)) return;

    const id = `filter-${key}`;
    const label = key.charAt(0).toUpperCase() + key.slice(1).replaceAll('_', ' ');

    const uniqueValues = [...new Set(filteredData.map(item => item[key]).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'id', { sensitivity: 'base' }));
    if (uniqueValues.length === 0) return;

    const div = document.createElement('div');
    div.className = "form-group";

    const labelEl = document.createElement('label');
    labelEl.setAttribute('for', id);
    labelEl.textContent = label;

    const selectEl = document.createElement('select');
    selectEl.id = id;
    selectEl.name = key;
    selectEl.setAttribute('aria-label', label);
    selectEl.className = "form-control";

    const optAll = document.createElement('option');
    optAll.value = "";
    optAll.textContent = `-- Semua ${label} --`;
    selectEl.appendChild(optAll);

    uniqueValues.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      if (filters[key] === value) option.selected = true;
      selectEl.appendChild(option);
    });
    
    selectEl.addEventListener('change', () => {
      filters[key] = selectEl.value;
      for (let i = index + 1; i < keys.length; i++) {
        delete filters[keys[i]];
      }
      renderFilters(data, keys);
    });

    div.appendChild(labelEl);
    div.appendChild(selectEl);
    container.appendChild(div);
  });
  setupFilterListeners();
}

function setupFilterListeners() {
  const wrapper = document.querySelector(`[data-element="filter-produk"]`);
  if (!wrapper) return;

  const selects = wrapper.querySelectorAll("select");

  selects.forEach(select => {
    select.addEventListener("change", function () {
      const key = select.name || select.id.replace(/^filter-/, '');
      const value = select.value;

      if (value === "") {
        delete filters[key];
      } else {
        filters[key] = value;
      }
      _dekeku.params.filters = filters;
      _dF.writeURLParams(_dekeku.params);
      updateDataProdukShow();
      renderProduk(dataProdukShow);
    });
  });
}


// ================== RENDER PRODUK ==================
function renderProduk(data) {
  const container = document.querySelector(`[data-element="daftar-produk"]`);
  if (!container) return;

  const produkId = getUniqueId("daftar-produk");
  container.id = produkId;
  container.innerHTML = "";

  if (produkId) {
    const existingBtn = document.getElementById(`${produkId}-load-more`);
    if (existingBtn) existingBtn.remove();
  }

  document.querySelectorAll('[id$="-load-more"]').forEach(btn => {
    const prefix = btn.id.replace("-load-more", "");
    if (!document.getElementById(prefix)) {
      btn.remove();
    }
  });

  loadMoreProduk({ data, container, produkId });
}



function loadMoreProduk({ data, container, produkId }) {
  let currentIndex = 0;

  function loadMore() {
    const slice = data.slice(currentIndex, currentIndex + PRODUK_PER_HALAMAN);
    slice.forEach((tema) => {
      const card = document.createElement("div");
      card.className = "col-6 col-sm-6 col-lg-3 mb-3 p-2";
      let linkRel = tema.link_produk.split("https://undangan.dekeku.my.id").pop();
      let orderJson = JSON.stringify({
        Nama: capitalizeWords(tema.nama),
        Acara: capitalizeWords(tema.acara),
        Tema: capitalizeWords(tema.tema),
        Link: `${tema.link_produk}?d=${params}`
      });
      card.innerHTML = `
        <div class="card bg-primary shadow-soft border-light overflow-hidden">
          <img src="${tema.img}" alt="${tema.nama}">
          <div class="card-footer border-top border-light p-4">
            <a href="${linkRel}?d=${params}" class="p">${tema.nama}</a>
            <div class="d-flex justify-content-around align-items-center mt-3">
              <button class="btn btn-icon-only btn-buy" data-event_click="button-whatsapp-order" data-produk='${orderJson}' data-kontak="${window._dekeku.dataJson.seller.kontak}" data-tema-id='${tema.id}'>
                <span class="fab fa-whatsapp"></span>
              </button>
              <a class="btn btn-icon-only" href="${linkRel}?d=${params}" target=_blank data-placement="bottom" data-toggle="tooltip" title="Lihat">
                <span class="fas fa-eye"></span>
              </a>
            </div>
          </div>
        </div>`;

      container.appendChild(card);
    });

    currentIndex += PRODUK_PER_HALAMAN;

    if (currentIndex < data.length) {
      showLoadMoreButton();
    } else {
      const btnWrapper = document.getElementById(`${produkId}-load-more-wrapper`);
      const btn = document.getElementById(`${produkId}-load-more`);
      if (btnWrapper) btnWrapper.remove();
      if (btn) btn.disabled = true;
    }
  }

  function showLoadMoreButton() {
    let wrapperId = `${produkId}-load-more-wrapper`;
    let btnId = `${produkId}-load-more`;

    let btnWrapper = document.getElementById(wrapperId);
    if (!btnWrapper) {
      btnWrapper = document.createElement("div");
      btnWrapper.id = wrapperId;
      btnWrapper.className = "d-flex justify-content-center";
      container.parentElement.appendChild(btnWrapper);
    }

    let btn = document.getElementById(btnId);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = btnId;
      btn.className = "btn btn-pill btn-primary";
      btn.setAttribute('aria-label', 'Lihat Lebih Banyak');
      btn.textContent = "Lihat Lebih Banyak";
      btn.onclick = loadMore;
      btnWrapper.appendChild(btn);
    }
  }  
  loadMore();
}
function encodeUrlSafe(str) {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
