import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { meetsDifficulty, powDigest, submissionMessage, workRequestMessage } from "../src/pow.js";

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

test("canonical signed messages are byte-stable", () => {
  assert.equal(workRequestMessage({ address: "krk1abc", timestamp: 123, requestNonce: "00ff" }), "korek-miner-v3:work:krk1abc:123:00ff");
  assert.equal(submissionMessage({ templateId: "id", nonce: 9, powHash: "abcd", timestamp: 456 }), "korek-miner-v3:submit:id:9:abcd:456");
});
