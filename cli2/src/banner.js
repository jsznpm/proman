const G = "\x1b[32m"; // green
const GB = "\x1b[1;92m"; // bright green bold
const DIM = "\x1b[2;32m"; // dim green
const R = "\x1b[0m"; // reset

const ART = String.raw`
 ██    ██ ██████  ██    ██ ██      ██  ██████   █████  ███    ██
 ██    ██ ██   ██ ██    ██ ██      ██ ██       ██   ██ ████   ██
 ██    ██ ██████  ██    ██ ██      ██ ██   ███ ███████ ██ ██  ██
 ██    ██ ██   ██ ██    ██ ██      ██ ██    ██ ██   ██ ██  ██ ██
  ██████  ██████   ██████  ███████ ██  ██████  ██   ██ ██   ████
`;

const TOP = "╔══════════════════════════════════════════════════════════════╗";
const BOT = "╚══════════════════════════════════════════════════════════════╝";

const BANNER = [
  "",
  `${G}${TOP}${R}`,
  `${GB}${ART.replace(/^\n+|\n+$/g, "")}${R}`,
  `${DIM}      [ markdown recon // terminal access // v2 ]${R}`,
  `${G}${BOT}${R}`,
  `${DIM}  > By Javid Salimov | Software Engineer | https://github.com/javidselimov${R}`,
  "",
].join("\n");

export function printBanner() {
  console.log(BANNER);
}
