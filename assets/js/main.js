import dekeku, { dekekuFunction as _dF } from "https://cdn.jsdelivr.net/gh/wahyuajismustofa/dekeku@fd1fd81f4c842a66d71a5cc578291a8b19db20ba/assets/js/dekeku.js";
export default dekeku;

export async function init() {
  setupShareButton();
  await _dF.waitUntilTrue(() => dekeku.ready).then(() => {
    dekeku.params = _dF.readURLParams();
    _dF.initDekeku();
    window.showAlert = _dF.showAlert;
  }).catch(
    err => console.error(err.message)
  );
}

export async function initSeller(sellerFilter){
  let fileSeller = {file: "data.seller", nama: "seller", obj:true, filter:{ [Object.keys(sellerFilter)] : sellerFilter[Object.keys(sellerFilter)] }, repo:{username:"wahyuajismustofa",repo:"dekeku"}};
  _dF.pushUniqueObj(dekeku.daftarJson,"nama",fileSeller);
  await _dF.loadAllData();
  await configDataSeller(sellerFilter,fileSeller);
  await _dF.updateDataAtt("dekeku_data_seller", dekeku.dataJson[fileSeller.nama]);
  applyDataParamsToHref();
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
  dekeku.dataJson[fileSeller.nama].params = encodeUrlSafe(JSON.stringify({sellerId: dekeku.dataJson[fileSeller.nama].id}));
}

function encodeUrlSafe(str) {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function applyDataParamsToHref() {
  let selector = 'a[data-params]';
  document.querySelectorAll(selector).forEach(el => {
    const params = el.getAttribute('data-params');
    if (params) {
      const url = new URL(el.getAttribute('href'), window.location.origin);
      url.searchParams.set("d", params);
      el.setAttribute("href", url.toString().replace(window.location.origin, ""));
      el.removeAttribute("data-params");
    }
  });
}
_dF.encodeUrlSafe = encodeUrlSafe;

function setupShareButton(buttonSelector = "#btnShare") {
  const btn = document.querySelector(buttonSelector);
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const url = window.location.href;
    const title = document.title || "Bagikan halaman ini";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        console.log("Link berhasil dibagikan");
      } catch (err) {
        console.error("Gagal membagikan:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link disalin ke clipboard:\n" + url);
      } catch (err) {
        console.error("Clipboard gagal:", err);
      }
    }
  });
}
