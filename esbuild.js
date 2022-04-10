// @ts-check
import fs from "fs"
import esbuild from "esbuild"

function build(format, outfile) {
  return esbuild.build({
    minify: true,
    keepNames: false,
    bundle: true,
    metafile: true,
    target: "esnext",
    platform: "neutral",
    format,
    outfile,
    entryPoints: ["./string_score.ts"],
  });
}

fs.rmSync("./lib", {recursive: true})

Promise.all([
  build("esm", "./lib/string_score.esm.js"),
  build("cjs", "./lib/string_score.cjs"),
]).then((results) => {
  results.forEach((result) => {
    const output = result?.metafile?.outputs || {};

    Object.keys(output).forEach((fileName) => {
      // convert to kilobyte
      const fileSize = output[fileName].bytes / 1000;
      console.log(`${fileName} => ${fileSize} Kb`);
    });
  });
});
