export const template ={
    globalHeader: () =>`
  <header class="header-global fixed-top" id="header-global">
    <nav aria-label="Primary navigation" class="navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-light navbar-theme-primary" id="navbar-main">
    <div class="container position-relative">
    <a data-dekeku_data_seller='{"home_page":"href"}' class="navbar-brand shadow-soft py-2 px-3 rounded border border-light mr-lg-4" style="background: #FFF;" href="/">
    <img data-dekeku_data_seller='{"favicon":"src"}' alt="Logo light" class="navbar-brand-dark" src="/assets/img/brand/dark-1.svg"/>
    <img data-dekeku_data_seller='{"favicon":"src"}' alt="Logo dark" class="navbar-brand-light" src="/assets/img/brand/dark-1.svg"/>
    </a>
    <div class="navbar-collapse collapse" id="navbar_global">
    <div class="navbar-collapse-header">
        <div class="row">
        <div class="col-6 collapse-brand">
        <a data-dekeku_data_seller='{"home_page":"href"}' class="navbar-brand shadow-soft py-2 px-3 rounded border border-light" href="/">
        <img data-dekeku_data_seller='{"favicon":"src"}'  alt="logo" src="/assets/img/brand/dark-1.svg"/>
        </a>
        </div>
        <div class="col-6 collapse-close">
        <a aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation" class="fas fa-times" data-target="#navbar_global" data-toggle="collapse" href="#navbar_global" title="close">
        </a>
        </div>
        </div>
    </div>
    <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <li>
        <a data-dekeku_data_seller='{"katalog_page":"href"}' class="nav-link" href="/">
        Katalog Undangan
        </a>
        </li> 
        <li>
        <a data-dekeku_data_seller='{"params":"data-params"}' class="nav-link" href="/pages/tamu-undangan.html">
        Tamu Undangan
        </a>
        </li> 
    </ul>
    </div>
    <div class="d-flex align-items-center">
    <a class="btn btn-sm btn-primary" data-dekeku_data_seller='{"sosialMedia_whatsApp":"href"}' target="_blank" role="button">
        <span class="fab fa-whatsapp">
        </span>
    </a>
    <button aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler ml-2" data-target="#navbar_global" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon">
        </span>
    </button>
    </div>
    </div>
    </nav>
  </header>
    `,
    globalFooter: () => `
  <footer class="d-flex pb-5 pt-6 pt-md-7 border-top border-light bg-primary" id="footer-global">
    <div class="container">
    <div class="row">
        <div class="col-lg-6">
        <p>
        <strong>
        Undangan Digital <span data-dekeku_data_seller='{"nama":"textContent"}'></span>
        </strong>
        menyediakan undangan digital dengan desain elegan, interaktif, dan personal. Cocok untuk pernikahan, khitanan, ulang tahun, hingga acara formal. Dilengkapi fitur RSVP online, peta lokasi, galeri foto, dan musik latar, menjadikan momen Anda lebih berkesan, praktis, dan ramah lingkungan.
        </p>
        <ul class="d-flex list-unstyled mb-5 mb-lg-0">
        <li class="mr-2">
        <a aria-label="whatsapp social link" class="btn btn-icon-only btn-pill btn-primary" data-placement="top" data-toggle="tooltip" data-dekeku_data_seller='{"sosialMedia_whatsApp":"href"}' target="_blank" title="WhatsApp">
            <span aria-hidden="true" class="fab fa-whatsapp">
            </span>
        </a>
        </li>
        <li class="mr-2">
        <a aria-label="facebook social link" class="btn btn-icon-only btn-pill btn-primary" data-placement="top" data-toggle="tooltip" data-dekeku_data_seller='{"sosialMedia_facebook":"href"}' target="_blank" title="Facebook">
            <span aria-hidden="true" class="fab fa-facebook">
            </span>
        </a>
        </li>
        <li class="mr-2">
        <a aria-label="instagram social link" class="btn btn-icon-only btn-pill btn-primary" data-placement="top" data-toggle="tooltip" data-dekeku_data_seller='{"sosialMedia_instagram":"href"}' target="_blank" title="Instagram">
            <span aria-hidden="true" class="fab fa-instagram">
            </span>
        </a>
        </li>
        <li class="mr-2">
          <button id="btnShare" 
                  class="btn btn-icon-only btn-pill btn-primary" 
                  data-placement="top" data-toggle="tooltip" 
                  title="Bagikan Link">
            <span aria-hidden="true" class="fas fa-share-alt"></span>
          </button>
        </li>        
        </ul>
        </div>
        <div class="col-lg-6">
        <h5>
        Kontak Cepat
        </h5>
        <p class="text-gray font-small mt-2">
        Hubungi kami untuk konsultasi keperluan anda.
        </p>
        <form data-aksi="custom-whatsapp" data-keterangan="Undangan Digital" data-dekeku_data_seller='{"kontak":"data-kontak"}'>
        <div class="form-row mb-2">
        <div class="col-12">
            <label class="h6 font-weight-normal d-none" for="footer-pesan-wa">
            Pesan
            </label>
            <textarea aria-label="Input Pesan WhatsApp" class="form-control mb-2" id="footer-pesan-wa" name="pesan" placeholder="Tulis Pesan Anda.." required="" rows="4"></textarea>
        </div>
        <div class="col-12">
            <button class="btn btn-primary btn-block" data-loading-text="Sending" type="submit">
            <span>
            Kirim
            </span>
            </button>
        </div>
        </div>
        </form>
        <p class="text-gray font-small m-0">
        Kepuasan Anda kebanggan kami.
        </p>
        </div>
    </div>
    <hr class="my-5"/>
    <div class="row">
        <div class="col">
        <a data-dekeku_data_seller='{"home_page":"href"}' class="d-flex justify-content-center" href="/">
        <img data-dekeku_data_seller='{"logo1":"src"}' alt="Themesberg Logo" class="mb-3" width="200" src="/assets/img/brand/logo.svg"/>
        </a>
        <div class="d-flex text-center justify-content-center align-items-center" role="contentinfo">
        <p class="font-weight-normal font-small mb-0">
        <strong>
            Undangan Digital <span data-dekeku_data_seller='{"nama":"textContent"}'></span>
        </strong>
            ©
        <span class="current-year">
            2025
        </span>
        </p>
        </div>
        </div>
    </div>
    </div>     
  </footer> 
    `,
    katalog: () =>`
  <main>
   <!-- Hero -->
   <div class="section section-header bg-soft">
    <div class="container">
     <div class="row justify-content-center">
      <div class="col-12 col-lg-8 text-center">
       <h1 class="display-3 mb-4">
        Katalog Undangan Digital
       </h1>
       <p class="lead mb-4">
        <strong>
        <span data-dekeku_data_seller='{"nama":"textContent"}'></span>
        </strong>
        menyediakan berbagai undangan digital dengan desain elegan, interaktif, dan personal untuk momen istimewa Anda.
       </p>
      </div>
     </div>
    </div>
   </div>
   <div class="section section-lg pt-0">
    <div class="container">
     <div class="text-center d-flex flex-wrap justify-content-around" data-element="filter-produk">
     </div>
     <div class="row" data-element="daftar-produk">
     </div>
    </div>
   </div>
  </main>
    `,
};

const scriptMap = {
  jquery: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js",
    integrity: "sha512-k2WPPrSgRFI6cTaHHhJdc8kAXaRM4JBFEDo1pPGGlYiOyv4vnA0Pp0G5XMYYxgAPmtmv/IIaQA6n5fLAyJaFMA=="
  },
  popper: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js",
    integrity: "sha512-ubuT8Z88WxezgSqf3RLuNi5lmjstiJcyezx34yIU2gAHonIi27Na7atqzUZCOoY4CExaoFumzOsFQ2Ch+I/HCw=="
  },
  bootstrap: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-v4-rtl/4.3.1-0/js/bootstrap.min.js",
    integrity: "sha512-OUTo0k3tQaY48oUR7082t08hnB63qZ/LmOOUma44cJ8zVFEd/1fpsQQtKOErwbQvUzRiTg1RIxKChJ/yV2Cs7A=="
  },
  headroom: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/headroom/0.10.3/headroom.min.js",
    integrity: "sha512-5HDB4wQMLzTg7JO3es4pf9yCcSa23kEyZ1ABopVxUtyEEpDBkSCWkARmzecUnYInKYN0wGYceoOfMf9qej0yQw=="
  },
  onscreen: { src: "https://cdn.jsdelivr.net/npm/onscreen@1.4.0/dist/on-screen.umd.js" },
  nouislider: { src: "https://cdn.jsdelivr.net/npm/nouislider@15.8.1/dist/nouislider.min.js" },
  datepicker: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js",
    integrity: "sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ=="
  },
  waypoints: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js",
    integrity: "sha512-CEiA+78TpP9KAIPzqBvxUv8hy41jyI3f2uHi7DGp/Y/Ka973qgSdybNegWFciqh6GrN2UePx2KkflnQUbUhNIA=="
  },
  jarallax: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/jarallax/1.12.0/jarallax.min.js",
    integrity: "sha512-T4mRn05lSEplMU6OXmE8AA5/buii2nJ9pga1EPeDdcP3Xof/f6juRGE26WQCYiwPZJq5iyLApeaxy+stYBT/rQ=="
  },
  counterup: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js",
    integrity: "sha512-d8F1J2kyiRowBB/8/pAWsqUl0wSEOkG5KATkVV4slfblq9VRQ6MyDZVxWl2tWd+mPhuCbpTB4M7uU/x9FlgQ9Q=="
  },
  countdown: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.countdown/2.2.0/jquery.countdown.min.js",
    integrity: "sha512-lteuRD+aUENrZPTXWFRPTBcDDxIGWe5uu0apPEn+3ZKYDwDaEErIK9rvR0QzUGmUQ55KFE2RqGTVoZsKctGMVw=="
  },
  smoothscroll: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/smooth-scroll/16.1.3/smooth-scroll.polyfills.min.js",
    integrity: "sha512-LZ6YBzwuQvIG41twjliX3HUVeAd+ErnJ0UsqRnkI4firX2l71jxbKJoax/hu7XY2tiyLl0YA2kcnz/XEW+9O3g=="
  },
  prism: {
    src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/prism.min.js",
    integrity: "sha512-9+422Bs3A87UkWfp+qV80Nfv9arhbCXKY1rxrF2seorI36mIIstMiuBfyKLF1yH1nnzQkEWq2xrzT4XU3Z+vrA=="
  },
  githubButtons: { src: "https://buttons.github.io/buttons.js", async: true, defer: true },
  tema: {
    src: "https://cdn.jsdelivr.net/gh/wahyuajismustofa/dekeku@20b911db4ba561a6b2798483c958df43ac9e2b75/assets/js/tema.js",
    defer: true
  },
  produk: { src: "/assets/js/produk.js", type: "module" }
};

export const loadScript = async (names = []) => {
  for (const name of names) {
    const scriptData = scriptMap[name];
    if (!scriptData) {
      console.warn(`Script "${name}" tidak ditemukan di scriptMap`);
      continue;
    }

    const { src, integrity, async, defer, type } = scriptData;

    // tunggu sampai script selesai di-load sebelum lanjut ke berikutnya
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;

      if (integrity) {
        s.integrity = integrity;
        s.crossOrigin = "anonymous";
        s.referrerPolicy = "no-referrer";
      }
      if (type) s.type = type;

      // jangan set async/defer supaya urut
      s.async = false;
      s.defer = false;

      s.onload = () => resolve();
      s.onerror = () => {
        console.error(`Gagal load script: ${src}`);
        resolve(); // tetap lanjut ke script berikutnya
      };

      document.body.appendChild(s);
    });
  }
};

export function createTable(container, columns, rowData) {
  if (!container) return;
  container.innerHTML = "";
  const table = document.createElement("table");
  table.className = "table shadow-soft rounded";

  // Header
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  columns.forEach(col => {
    const th = document.createElement("th");
    th.scope = "col";
    th.className = "border-0";
    th.id = col.id;
    th.textContent = col.label;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");

  rowData.forEach(row => {
    const tr = document.createElement("tr");

    columns.forEach(col => {
      const td = document.createElement("td");

      if (col.type === "button") {
        // Buat tombol sesuai attr
        const attrs = col.attr ? JSON.parse(col.attr) : {};
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-sm btn-primary";

        // isi text
        btn.textContent = col.value || "Action";

        // set dataset sesuai attr mapping
        for (const key in attrs) {
            let value = attrs[key];
          if (key === "event_click"){
            btn.setAttribute("data-event_click", value);
          }else{
            btn.dataset[key] = row[value] || "";
          }
        }

        td.appendChild(btn);
      } else {
        td.textContent = row[col.value] || "";
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

