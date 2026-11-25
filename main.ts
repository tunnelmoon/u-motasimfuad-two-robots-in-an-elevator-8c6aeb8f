// Two Robots in an Elevator - make.fun bounty entry
// One line of awkward small talk one robot says to another in an elevator.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your charging cable is showing. Sorry. I should not have looked. I have logged it anyway.";

function fail(message: string): never {
  throw new Error(message);
}

if (LINE.length < 1 || LINE.length > 200) {
  fail(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  fail("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  fail("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip read-back check: what we wrote must be exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  fail("round-trip check failed: entry.txt does not match the entry");
}
console.log(`wrote ${outPath} (${LINE.length} chars)`);
