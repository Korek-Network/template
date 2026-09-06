import { createHash } from "node:crypto";

export const MINER_PROTOCOL = "korek-planck-miner/3";

export function powDigest(challenge, nonce) {
  if (!/^[0-9a-f]{64}$/i.test(challenge)) throw new Error("challenge must be 32-byte hex");
  if (!Number.isInteger(nonce) || nonce < 0 || nonce > 0xffffffff) throw new Error("nonce must be uint32");
  const nonceBytes = Buffer.allocUnsafe(4);
  nonceBytes.writeUInt32BE(nonce);
  return createHash("sha256").update(Buffer.from(challenge, "hex")).update(nonceBytes).digest("hex");
}

export function meetsDifficulty(hash, difficulty) {
  if (!/^[0-9a-f]{64}$/i.test(hash)) return false;
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 16) return false;
  return hash.startsWith("0".repeat(difficulty));
}

export function workRequestMessage({ address, timestamp, requestNonce }) {
  return `korek-miner-v3:work:${address}:${timestamp}:${requestNonce}`;
}

export function submissionMessage({ templateId, nonce, powHash, timestamp }) {
  return `korek-miner-v3:submit:${templateId}:${nonce}:${powHash}:${timestamp}`;
}

export function workChallenge(template) {
  const canonical = {
    protocol: MINER_PROTOCOL,
    networkId: template.networkId,
    templateId: template.templateId,
    height: template.height,
    previousHash: template.previousHash,
    rewardAddress: template.rewardAddress,
    reward: template.reward,
    minerReward: template.minerReward,
    treasuryReward: template.treasuryReward,
    treasuryAddress: template.treasuryAddress,
    feePayout: template.feePayout,
    difficulty: template.difficulty,
    issuedAt: template.issuedAt,
    notBefore: template.notBefore,
    expiresAt: template.expiresAt
  };
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}
