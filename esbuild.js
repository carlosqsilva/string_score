// @ts-check
import fs from "node:fs";
import esbuild from "esbuild";

fs.rmSync("./lib", { recursive: true });

function build(outfile) {
  return esbuild.build({
    minify: true,
    keepNames: false,
    bundle: true,
    metafile: true,
    target: "esnext",
    platform: "neutral",
    format: "esm",
    outfile,
    entryPoints: ["./string_score.ts"],
  });
}

build("./lib/index.js").then((result) => {
  const output = result?.metafile?.outputs || {};

  for (const fileName of Object.keys(output)) {
    // convert to kilobyte
    const fileSize = output[fileName].bytes / 1000;
    console.log(`${fileName} => ${fileSize} Kb`);
  }
});
