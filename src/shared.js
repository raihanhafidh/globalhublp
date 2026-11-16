/* ===== Global Hub LP — catatan untuk developer =====
   1. WA_NUMBER  : nomor admin (diambil dari globalhub.id/study-abroad).
   2. Semua CTA punya data-cta="checkout|whatsapp" + data-pos="posisi".
      Klik akan push event `lp_cta_click` ke dataLayer -> map di GTM ke
      Meta Pixel: checkout = InitiateCheckout, whatsapp = Contact.
   3. UTM dari URL iklan otomatis diteruskan ke link Order Online.
   4. Pesan WA otomatis menyertakan kode halaman + posisi tombol, supaya admin
      tahu lead datang dari versi & tombol yang mana.
*/
(function () {
  var WA_NUMBER = "6289676029275";
  var VARIANT = (document.querySelector("[data-variant]") || document.body).dataset.variant || "X";
  window.dataLayer = window.dataLayer || [];

  function waUrl(text) {
    return "https://api.whatsapp.com/send?phone=" + WA_NUMBER + "&text=" + encodeURIComponent(text);
  }

  // Link WhatsApp: <a data-cta="whatsapp" data-msg="..." data-pos="hero">
  document.querySelectorAll('a[data-cta="whatsapp"]').forEach(function (a) {
    var msg = a.dataset.msg || "Halo Admin Global Hub, aku mau konsultasi soal Study Abroad.";
    // data-wa-plain di <body>: pesan dikirim apa adanya (LP IELTS: admin menghitung dari kalimat pembuka)
    var plain = document.body.hasAttribute("data-wa-plain");
    a.href = waUrl(plain ? msg : msg + "\n\nNama: \n\n(ref: SA-" + VARIANT + "/" + (a.dataset.pos || "-") + ")");
    a.target = "_blank"; a.rel = "noopener";
  });

  // Teruskan UTM ke Order Online
  var qs = location.search.replace(/^\?/, "");
  document.querySelectorAll('a[data-cta="checkout"]').forEach(function (a) {
    if (qs) a.href += (a.href.indexOf("?") > -1 ? "&" : "?") + qs;
  });

  // Tracking klik
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-cta]");
    if (!el) return;
    window.dataLayer.push({ event: "lp_cta_click", cta: el.dataset.cta, pos: el.dataset.pos || "", variant: VARIANT, paket: el.dataset.paket || "" });
  });

  // Form kualifikasi -> WhatsApp (Versi B)
  var form = document.getElementById("wa-form");
  if (form) {
    document.getElementById("wa-send").addEventListener("click", function () {
      var fields = form.querySelectorAll("input,select"), f = new Map();
      for (var i = 0; i < fields.length; i++) {
        if (!fields[i].reportValidity()) return;
        f.set(fields[i].name, fields[i].value.trim());
      }
      var text = "Halo Admin Global Hub, aku mau konsultasi Study Abroad.\n\n" +
        "Nama: " + (f.get("nama") || "") + "\n" +
        "Jenjang tujuan: " + (f.get("jenjang") || "") + "\n" +
        "Beasiswa incaran: " + (f.get("beasiswa") || "") + "\n" +
        "Rencana apply: " + (f.get("kapan") || "") + "\n\n(ref: SA-" + VARIANT + "/form)";
      window.dataLayer.push({ event: "lp_cta_click", cta: "whatsapp", pos: "form", variant: VARIANT });
      window.open(waUrl(text), "_blank", "noopener");
    });
  }

  // Satu pilihan -> WhatsApp (penutup LP IELTS Versi A)
  var pick = document.getElementById("wa-pick"), pickSend = document.getElementById("wa-pick-send");
  if (pick && pickSend) {
    pickSend.addEventListener("click", function () {
      if (!pick.reportValidity()) return;
      window.dataLayer.push({ event: "lp_cta_click", cta: "whatsapp", pos: "penutup", variant: VARIANT });
      window.open(waUrl(pickSend.dataset.msg.replace("{pilihan}", pick.value)), "_blank", "noopener");
    });
  }

  // Bar melayang baru muncul setelah hero lewat
  var bar = document.querySelector(".sticky[data-after-hero]"), hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    bar.classList.add("hide");
    new IntersectionObserver(function (en) { bar.classList.toggle("hide", en[0].isIntersecting); }, { threshold: 0.15 }).observe(hero);
  }

  // Pemilih tahap -> sorot paket yang cocok (Versi B)
  var stage = document.querySelector(".stage");
  if (stage) {
    stage.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      stage.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      document.querySelectorAll(".pk .card[data-paket]").forEach(function (c) {
        var on = c.dataset.paket === b.dataset.target;
        c.classList.toggle("pick", on); c.classList.toggle("dim", !on);
      });
    });
  }
})();
