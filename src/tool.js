const backup = Deno.env.get("CL_LOG_BACKUP");
import { create, web_deal } from "fpng-sign-serve";
Deno.copyFileSync("/home/divine/websites/site/ada/assets/std_template.tex","./assets/std_template.tex")
Deno.copyFileSync("/home/divine/websites/site/ada/assets/std_graph.tex","./assets/std_graph.tex")
Deno.copyFileSync("/home/divine/websites/site/ada/assets/inline_icons.tex","./assets/inline_icons.tex")
const site = {};
let p_c = [
  "--highlight-style=tango",
  "--pdf-engine=lualatex",
  "--pdf-engine-opt=-shell-escape",
  "--embed-resources",
  "--filter",
  "pandoc-crossref",
  "--filter",
  "src/filt.js",
  "--citeproc",
  "-o",
  "assets/log.pdf",
  "log.md",
  "assets/metadata.yaml",
];
console.log(`running pandoc ${p_c.join(" ")}`);
new Deno.Command("pandoc", {
  args: p_c,
}).outputSync();
p_c = [
  "--highlight-style=tango",
  "--filter",
  "pandoc-crossref",
  "--filter",
  "src/filt.js",
  "--citeproc",
  "-s",
  "-o",
  "assets/log_head.html",
  "--table-of-contents",
  "-t",
  "html5",
  "log.md",
  "assets/metadata.yaml",
];
console.log(`running pandoc ${p_c.join(" ")}`);
new Deno.Command("pandoc", {
  args: p_c,
}).outputSync();
site.pdf = Array.from(Deno.readFileSync("assets/log.pdf"));
site.page = Deno.readTextFileSync("assets/page.html");
let chompy=Deno.readTextFileSync("assets/log_head.html").match(
  /<header id="title-block-header">.+?<h1 class="title">/s,
)
site.html = chompy.input.slice(chompy.index+32,-22)
site.css = Deno.readTextFileSync("assets/style.css");
create(site,backup)
Deno.serve({
  port: 3052,
  hostname: "0.0.0.0",
  handler: (req) => web_deal(req),
});
