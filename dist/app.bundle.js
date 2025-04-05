document.body.insertAdjacentHTML("beforeend", site.page);
document.getElementById("home").insertAdjacentHTML("beforeend", site.html);
const iframe = document.createElement("iframe");
iframe.srcdoc = site.viewer.replace("thisistss", t).replace("thisisadler", a)
  .replace("thisislength", g).replace("thisistextlength", tl);
iframe.id = "pdf_frame";
document.getElementById("pdf").appendChild(iframe);
const style = document.createElement("style");
style.textContent = site.css;
document.head.appendChild(style);

function terms() {
  document.getElementById("terms").style.display = "block";
  document.getElementById("pdf").style.display = "none";
  document.getElementById("home").style.display = "none";
}
function home() {
  document.getElementById("terms").style.display = "none";
  document.getElementById("pdf").style.display = "none";
  document.getElementById("home").style.display = "block";
}
function description() {
  document.getElementById("terms").style.display = "none";
  document.getElementById("pdf").style.display = "flex";
  document.getElementById("home").style.display = "none";
}
refresh();
function refresh() {
  const hash = globalThis.location.hash.substring(1) || "home";
  hash == "terms"
    ? terms()
    : hash == "export"
    ? svg_out()
    : hash == "pdf"
    ? description()
    : home();
}
globalThis.addEventListener("hashchange", () => {
  refresh();
});
