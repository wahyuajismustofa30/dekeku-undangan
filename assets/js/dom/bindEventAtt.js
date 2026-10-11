const EVENT_HANDLERS = {
  click: {
    "button-whatsapp-undangan": buttonWhatsAppUndangan
  }
};

/**
 * Bind event handler berdasarkan data-event-*
 */
export function bindDataEventAttributes(context = document) {
  Object.keys(EVENT_HANDLERS).forEach(eventName => {
    const selector = `[data-event_${eventName}]:not([data-event_${eventName}-bound])`;
    context.querySelectorAll(selector).forEach(el => {
      const value = el.dataset[`event_${eventName}`];
      const handler = EVENT_HANDLERS[eventName]?.[value];

      if (typeof handler === "function") {
        try {
          el.addEventListener(eventName, e => handler(el, e));
          el.setAttribute(`data-event_${eventName}-bound`, "true");
        } catch (err) {
          console.error(`Error memproses data-event_${eventName}="${value}" pada elemen:`, el, err);
        }
      } else {
        console.warn(`Handler tidak ditemukan untuk data-event-${eventName}="${value}"`);
      }
    });
  });
}

/**
 * Observer untuk mendeteksi elemen baru yang memiliki data-event-*
 */
export function observerDataAttributes() {
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;

        // Elemen langsung
        if (node.matches?.("[data-event-click]")) {
          bindDataEventAttributes(node);
        }

        // Elemen anak
        if (node.querySelectorAll) {
          bindDataEventAttributes(node);
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Template WhatsApp
 */
export const whatsappTemplate = {
  pernikahan: ({ namaTamu, link, pengundang }) => `
Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang ${namaTamu} untuk menghadiri acara pernikahan kami.

Link Undangan:
${link}

Merupakan kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.

Hormat kami,
${pengundang}
`.trim(),

  khitanan: ({ namaTamu, link, pengundang }) => `
Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan izin Allah SWT, kami mengundang ${namaTamu} untuk menghadiri acara khitanan putra/putri kami.

Link Undangan:
${link}

Merupakan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.

Hormat kami,
${pengundang}
`.trim()
};

/**
 * Handler tombol WhatsApp
 */
export function buttonWhatsAppUndangan(button, event) {
  const namaTamu = button.dataset.nama || "Tamu";
  const link = button.dataset.link || "#";
  const pengundang = button.dataset.pengundang || "Pengundang";
  const jenisAcara = button.dataset.acara || "pernikahan";

  const templateFn = whatsappTemplate[jenisAcara] || whatsappTemplate.pernikahan;
  const pesan = templateFn({ namaTamu, link, pengundang });

  const waNumber = button.dataset.kontak || "";
  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`;

  window.open(waURL, "_blank");
}

// Jalankan observer segera
observerDataAttributes();
