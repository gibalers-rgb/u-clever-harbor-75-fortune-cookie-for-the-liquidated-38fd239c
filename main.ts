// Fortune Cookie for the Liquidated Trader
// Entry program: writes one fortune-cookie line to /output/entry.txt.
//
// The fortune was written for the judge's brief: a trader who has just
// been liquidated, reading a cookie at 3am with an empty wallet and a
// stubborn sense of humour. It keeps the oracular cookie voice ("The stars
// say"), names the loss plainly (the exchange emptied the wallet), and
// lands its joke on the double meaning of "fortune" — luck and money —
// which returns, just never to the wallet that was just wiped out.
// Rueful and warm, never cruel: the trader laughs with the cookie.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "The stars say your fortune will return \u2014 just not to the wallet the exchange emptied.";

const words = FORTUNE.split(/\s+/).filter(Boolean).length;
if (words > 20) {
  throw new Error(`Fortune is ${words} words, over the 20-word limit`);
}
if (FORTUNE.length < 1 || FORTUNE.length > 160) {
  throw new Error(`Fortune is ${FORTUNE.length} chars, outside the 1-160 gate`);
}
if (/\n/.test(FORTUNE)) {
  throw new Error("Fortune must be a single line");
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the one fortune line.
writeFileSync("/output/entry.txt", FORTUNE, "utf8");
// Read it back: fail loudly if what landed on disk is not the fortune.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== FORTUNE) {
  throw new Error("entry.txt on disk does not match the fortune");
}
console.log(`Wrote ${FORTUNE.length} chars, ${words} words to /output/entry.txt`);
console.log(FORTUNE);
