// Rakit halaman dari src/ menjadi file HTML mandiri (CSS + JS di dalam) untuk GitHub Pages.
// Jalankan: node build.js
const fs = require("fs"), path = require("path");
const src = f => fs.readFileSync(path.join(__dirname, "src", f), "utf8");
const css = src("shared.css"), ielts = src("ielts.css"), js = src("shared.js");

const pages = [
  ["ielts-a.html", "ielts-a", css + "\n" + ielts],
  ["ielts-b.html", "ielts-b", css + "\n" + ielts],
  ["a.html", "study-abroad-a", css],
  ["b.html", "study-abroad-b", css],
];
for (const [file, dir, style] of pages) {
  let html = src(file).replace("/*__CSS__*/", () => style).replace("/*__JS__*/", () => js);
  if (!/name="robots"/.test(html)) html = html.replace("<title>", '<meta name="robots" content="noindex">\n<title>');
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  fs.writeFileSync(path.join(__dirname, dir, "index.html"), html);
  console.log(dir + "/index.html", html.length, "bytes");
}
