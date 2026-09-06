import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { meetsDifficulty, powDigest } from "../src/pow.js";

const vectors = JSON.parse(await readFile(new URL("../vectors/miner-v3.json", import.meta.url), "utf8"));

for (const vector of vectors.vectors) {
  test(vector.name, () => {
    assert.equal(powDigest(vector.challenge, vector.nonce), vector.powHash);
  });
}

test("difficulty counts leading hexadecimal zeroes", () => {
  assert.equal(meetsDifficulty("000f" + "0".repeat(60), 3), true);
  assert.equal(meetsDifficulty("000f" + "0".repeat(60), 4), false);
});

