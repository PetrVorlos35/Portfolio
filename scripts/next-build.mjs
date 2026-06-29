// Runs `next build` and filters out one cosmetic line that Next's *bundled*
// copy of browserslist prints unconditionally (it has no env opt-out):
//   "[baseline-browser-mapping] The data in this module is over two months old..."
// Updating the standalone baseline-browser-mapping package does not help because
// Next ships its own vendored copy. Everything else passes through untouched, and
// the real exit code is preserved so a failing build still fails (CI / Vercel).

import { spawn } from "node:child_process";
import readline from "node:readline";

const child = spawn("next", ["build", ...process.argv.slice(2)], {
  stdio: ["inherit", "inherit", "pipe"],
});

readline.createInterface({ input: child.stderr }).on("line", (line) => {
  if (!line.includes("baseline-browser-mapping")) process.stderr.write(line + "\n");
});

for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
child.on("close", (code) => process.exit(code ?? 0));
