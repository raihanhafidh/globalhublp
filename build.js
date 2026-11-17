// Rakit halaman dari src/ menjadi file HTML mandiri (CSS + JS di dalam) untuk GitHub Pages.
// Jalankan: node build.js
const fs = require("fs"), path = require("path");
const src = f => fs.readFileSync(path.join(__dirname, "src", f), "utf8");
const css = src("lp.css"), js = src("shared.js"), icons = src("icons.html");

const pages = [
  ["ielts-a.html", "ielts-a", css],
  ["ielts-b.html", "ielts-b", css],
  ["a.html", "study-abroad-a", css],
  ["b.html", "study-abroad-b", css],
];
for (const [file, dir, style] of pages) {
  let html = src(file).replace("/*__CSS__*/", () => style).replace("/*__JS__*/", () => js).replace("<!--ICONS-->", () => icons);
  if (!/name="robots"/.test(html)) html = html.replace("<title>", '<meta name="robots" content="noindex">\n<title>');
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  fs.writeFileSync(path.join(__dirname, dir, "index.html"), html);
  console.log(dir + "/index.html", html.length, "bytes");
}
