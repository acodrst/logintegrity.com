// This is quite specific to my personal needs, but can be adapted.
// It listens on port 8000 for a path.  On Zettlr, the Vim mode uses 
// plugins/vim-mode.ts, which is bound to :w.  So, just put something like this:
// if (process.env.CL_CM_WEBSOCK_PORT) {
// const ws = new WebSocket(`ws://localhost:${process.env.CL_CM_WEBSOCK_PORT}`);
// ws.addEventListener("open", () => {
// ws.send(filePath)
// ws.close()
// })
// };
// in the code to transmit the path of the file being saved.
Deno.serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("message", (event) => {
    Deno.copyFileSync(
      "/home/divine/websites/My Library.bib",
      "/home/divine/websites/site/ada/assets/My Library.bib",
    );
    Deno.copyFileSync(
      "/home/divine/websites/My Library.bib",
      "/home/divine/websites/site/log/assets/My Library.bib",
    );
    if (event.data.includes("log.md")) {
      let p_c = [
        "--highlight-style=tango",
        "--pdf-engine=lualatex",
        "--pdf-engine-opt=-shell-escape",
        "--embed-resources",
        "--filter",
        "pandoc-crossref",
        "--filter",
        "/home/divine/websites/site/log/src/filt.js",
        "--citeproc",
        "-o",
        "/home/divine/websites/site/log/assets/log.pdf",
        "/home/divine/websites/site/log/log.md",
        "/home/divine/websites/site/log/assets/metadata.yaml",
      ];
      console.log(`running pandoc ${p_c.join(" ")}`);
      new Deno.Command("pandoc", {
        args: p_c,
      }).outputSync();
    }
    if (event.data.includes("lmp.md")) {
      let p_c = [
        "--highlight-style=tango",
        "--pdf-engine=lualatex",
        "--pdf-engine-opt=-shell-escape",
        "--embed-resources",
        "--filter",
        "pandoc-crossref",
        "--filter",
        "/home/divine/websites/site/ada/src/filt.js",
        "--citeproc",
        "-o",
        "/home/divine/websites/site/ada/assets/lmp.pdf",
        "/home/divine/websites/site/ada/lmp.md",
        "/home/divine/websites/site/ada/assets/metadata.yaml",
      ];
      console.log(`running pandoc ${p_c.join(" ")}`);
      new Deno.Command("pandoc", {
        args: p_c,
      }).outputSync();
    }
  });
  return response;
});
