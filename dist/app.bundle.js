var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var FileSaver_min$1 = {exports: {}};

var FileSaver_min = FileSaver_min$1.exports;

var hasRequiredFileSaver_min;

function requireFileSaver_min () {
	if (hasRequiredFileSaver_min) return FileSaver_min$1.exports;
	hasRequiredFileSaver_min = 1;
	(function (module, exports) {
		(function(a,b){b();})(FileSaver_min,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:false}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,false);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",true,true,window,0,0,0,80,20,false,false,false,false,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else {var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});

		
	} (FileSaver_min$1));
	return FileSaver_min$1.exports;
}

var FileSaver_minExports = requireFileSaver_min();
var saveAs = /*@__PURE__*/getDefaultExportFromCjs(FileSaver_minExports);

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
    const save_name = prompt("Enter the file name for saving the map in SVG format. This will save to your browser's download folder.","Streaming a Logical Map.pdf");
    const u8array=new Uint8Array(site.pdf);
    const blob_content = new Blob([u8array], {
      type: "application/pdf"
    });
    if (!(save_name===null)) saveAs(blob_content, save_name);
}
