import saveAs from "file-saver"
document.body.insertAdjacentHTML("beforeend", site.page);
document.getElementById("home").insertAdjacentHTML("beforeend", site.html);
const style = document.createElement("style");
style.textContent = site.css;
document.head.appendChild(style);
function terms() {
  document.getElementById("terms").style.display = "block";
  document.getElementById("home").style.display = "none";
}
function home() {
  document.getElementById("terms").style.display = "none";
  document.getElementById("home").style.display = "block";
}
function description() {
  document.getElementById("terms").style.display = "none";
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
    ? pdf()
    : home();
}
globalThis.addEventListener("hashchange", () => {
  refresh();
});
function pdf(){
    const save_name = prompt("Enter the file name for saving the map in SVG format. This will save to your browser's download folder.","Streaming a Logical Map.pdf")
    const u8array=new Uint8Array(site.pdf)
    const blob_content = new Blob([u8array], {
      type: "application/pdf"
    })
    if (!(save_name===null)) saveAs(blob_content, save_name)
}
