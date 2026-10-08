// Builds the gallery from photos.js. You shouldn't need to edit this file.
(function () {
  const photos = window.PHOTOS || [];
  const gallery = document.getElementById("gallery");
  const filters = document.getElementById("filters");
  const box = document.getElementById("lightbox");
  const boxImg = box.querySelector("img");
  const boxTitle = box.querySelector("[data-title]");
  const boxMeta = box.querySelector("[data-meta]");
  let shown = photos;
  let current = 0;

  const pad = (n) => String(n).padStart(2, "0");

  function render(category) {
    shown = category === "All" ? photos : photos.filter((p) => p.category === category);
    gallery.innerHTML = "";
    shown.forEach((p, i) => {
      const fig = document.createElement("figure");
      fig.className = "frame";
      fig.innerHTML =
        '<button type="button"><img loading="lazy" alt=""></button>' +
        '<figcaption><b></b><span class="no"></span></figcaption>';
      const img = fig.querySelector("img");
      img.src = "photos/" + p.file;
      img.alt = p.title + (p.place ? ", " + p.place : "");
      fig.querySelector("b").textContent = p.title;
      fig.querySelector(".no").textContent = pad(photos.indexOf(p) + 1) + "A";
      fig.querySelector("button").setAttribute("aria-label", "Open " + p.title);
      fig.querySelector("button").addEventListener("click", () => open(i));
      gallery.appendChild(fig);
    });
  }

  const categories = ["All", ...new Set(photos.map((p) => p.category).filter(Boolean))];
  categories.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.setAttribute("aria-pressed", c === "All" ? "true" : "false");
    b.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      render(c);
    });
    filters.appendChild(b);
  });

  function show(i) {
    current = (i + shown.length) % shown.length;
    const p = shown[current];
    boxImg.src = "photos/" + p.file;
    boxImg.alt = p.title;
    boxTitle.textContent = p.title;
    boxMeta.textContent = [p.place, p.year, p.settings].filter(Boolean).join("  ·  ");
  }
  function open(i) { show(i); box.hidden = false; box.querySelector("[data-close]").focus(); }
  function close() { box.hidden = true; }

  box.querySelector("[data-close]").addEventListener("click", close);
  box.querySelector("[data-prev]").addEventListener("click", () => show(current - 1));
  box.querySelector("[data-next]").addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  render("All");
})();
