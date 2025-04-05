#!/usr/bin/env -S deno run -A
const input = await new Response(Deno.stdin.readable).json();
const encoder = new TextEncoder();
const format = process.argv[2];
const dt = new Date();
const date = dt.toISOString().slice(0, 10);
const icons = { "tsa": {}, "ada": {}, "trs": {} };
icons.tsa.link = "https://doi.org/10.5281/zenodo.7826793";
icons.tsa.title = "Triple System Analysis";
icons.tsa.svg = Deno.readTextFileSync("assets/tsa.svg").trim();
icons.trs.link = "https://doi.org/10.5281/zenodo.13684896";
icons.trs.title = "Adaptive Analysis";
icons.trs.svg = Deno.readTextFileSync("assets/trs.svg").trim();
icons.ada.link = "https://adaptiveanalysis.org";
icons.ada.title = "A Flow Visualization Practionary";
icons.ada.svg = Deno.readTextFileSync("assets/ada.svg").trim();
if (format == "html5") {
  input.meta.author.c.unshift({
    "t": "RawInline",
    "c": ["html", `${Deno.readTextFileSync("assets/per.svg")}`],
  });
  input.meta.author.c.push({
    "t": "RawInline",
    "c": [
      "html",
      `<a href="https://orcid.org/0009-0001-4480-7776" title="ORCID">${
        Deno.readTextFileSync("assets/oid.svg")
      }</a>`,
    ],
  });
  input.meta.date.c.push({ "t": "RawInline", "c": ["html", date] });
}
if (format == "latex") {
  input.meta.author = {
    "t": "MetaInlines",
    "c": [
      {
        "t": "RawInline",
        "c": [
          "tex",
          "\\raisebox{-130pt}{\\includesvg[scale=.6]{assets/per.svg}}",
        ],
      },
      {
        "t": "RawInline",
        "c": [
          "tex",
          "\\hspace{10pt}",
        ],
      },
      {
        "t": "RawInline",
        "c": [
          "tex",
          "\\raisebox{-85pt}{Scott H., System Analyst \\hspace{6pt} \\raisebox{-2pt}{\\href{https://orcid.org/0009-0001-4480-7776}{\\includegraphics[width=18pt, height=18pt]{images/oid.eps}}}\\vspace{-.4in}}",
        ],
      },
      {
        "t": "RawInline",
        "c": [
          "tex",
          "\\vspace{-30pt}",
        ],
      },
    ],
  };
}

let data = encoder.encode(JSON.stringify(input));
const uris = {};
const bib = Deno.readTextFileSync("assets/My Library.bib");
for (
  const b of bib.matchAll(
    /@.+?\{(.+?),.+?title\s*=\s*\{(.+?)\}.+?url\s*=\s*\{(.+?)\}/gsm,
  )
) {
  uris[b[1]] = { "t": b[2], "u": b[3] };
}
const link_image = {};
link_image.latex = ["tex", "\\includesvg[scale=.06]{assets/link.svg}"];
link_image.html5 = ["html", Deno.readTextFileSync("assets/link.svg").trim()];
for (const b in input.blocks) {
  if (input.blocks[b].t == "Para") {
    let j = 0;
    while (j < input.blocks[b].c.length) {
      if (input.blocks[b].c[j]?.t == "Cite") {
        input.blocks[b].c = [...input.blocks[b].c.slice(0, parseInt(j) + 1), {
          "t": "Space",
        }, {
          "t": "Link",
          "c": [
            [
              "",
              [],
              [],
            ],
            [
              {
                "t": "RawInline",
                "c": link_image[format],
              },
            ],
            [
              uris[input.blocks[b].c[j].c[0][0].citationId].u,
              uris[input.blocks[b].c[j].c[0][0].citationId].t,
            ],
          ],
        }, ...input.blocks[b].c.slice(parseInt(j) + 1)];
      }
      if (format == "html5" && input.blocks[b].c[j]?.t == "RawInline") {
        const trm = input.blocks[b].c[j].c[1].trim().slice(1);
        if (["trs", "tsa", "ada"].includes(trm)) {
          input.blocks[b].c[j].c = [
            "html",
            `<a href="${icons[trm].link}" title="${icons[trm].title}">${
              icons[trm].svg
            }</a>`,
          ];
        }
      }
      j++;
    }
  }
  if (input.blocks[b].t == "Figure") {
    const fig_img = input.blocks[b].c[2][0].c[0].c[2][0].split("images/")[1];
    const s = input.blocks[b].c[2][0].c[0].c[0][2][0][1];
    const a = input.blocks[b].c[2][0].c[0].c[0][2][1][1];
    const fig_txt = Deno.readTextFileSync(`images/${fig_img}`);
    const label = input.blocks[b].c[0][0];
    const w = fig_txt.match(/width="\d*\.*?\d*pt"/s)[0].slice(7, -3) * s;
    const h = fig_txt.match(/height="\d*\.*?\d*pt"/s)[0].slice(8, -3) * s;
    const l = Math.floor(h / 96 / .14 + 3);

    if (format == "latex") {
      if (a!='n'){
      const align=a=="r"?"o":"i"
      const caption = input.blocks[b].c[2][0].c[0].c[1][0].c;
      input.blocks[b] = {
        "t": "RawBlock",
        "c": [
          "tex",
          `\\begin{wrapfigure}[${l}]{${align}}{0px}\\centering
          \\includesvg[scale=${s}]{images/${fig_img}}\\caption{${caption}}\\label{${label}}\\end{wrapfigure}`,
        ],
      };
    }
    }
    if (format == "html5") {
      const fig_num = input.blocks[b].c[2][0].c[0].c[1][2].c;
      const caption = input.blocks[b].c[2][0].c[0].c[1][4].c;
      const t = Deno.readTextFileSync(`images/${fig_img}`);
      input.blocks[b] = {
        "t": "RawBlock",
        "c": [
          "html",
          `<div style="float:right;width:${w}pt;">
          <figure id="${label}">${t}<figcaption>Fig ${fig_num} ${caption}</figcaption></figure></div>`,
        ],
      };
    }
  }
}
data = encoder.encode(JSON.stringify(input));
await Deno.stdout.writeSync(data);
