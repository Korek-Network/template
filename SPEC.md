# KOREK Planck Miner Protocol v3

Status: experimental public testnet specification.

## Work function

For each assigned template, miners search the inclusive `nonceStart..nonceEnd` range:

```text
powHash = SHA-256(hexToBytes(challenge) || uint32BE(nonce))
valid   = powHash begins with difficulty hexadecimal zero characters
```

The challenge is exactly 32 bytes and the nonce is an unsigned 32-bit integer. Hex strings are lowercase in canonical messages.

The signed template challenge also commits to the total subsidy, the 95% miner subsidy, the 5% treasury subsidy, the treasury address, and the complete accumulated transaction-fee payout. Changing any payout produces a different challenge.

## Planck economics under test

- maximum supply: 210,000,000 KRK
- genesis premine: 0 KRK
- target reward interval: 60 seconds
- initial subsidy: 50 KRK
- halving interval: 2,100,000 reward blocks
- subsidy: 95% miner and 5% treasury
- transaction fees: 100% successful miner

The Planck treasury address is an intentionally non-production test sink. Mainnet requires a separately generated public multisignature treasury and a genesis reset.

## Signed work request

A wallet signs this UTF-8 message with the Ed25519 key whose public key derives the reward address:

```text
korek-miner-v3:work:<reward-address>:<unix-time-ms>:<32-hex-request-nonce>
```

The node checks the address ownership, signature, timestamp window, replay nonce, and rate limit before issuing a short-lived template.

## Signed submission

After finding a proof, the same wallet signs:

```text
korek-miner-v3:submit:<template-id>:<uint32-nonce>:<pow-hash-hex>:<unix-time-ms>
```

The node independently recomputes the hash and rejects unknown, expired, premature, duplicate, stale, incorrectly owned, invalidly signed, out-of-range, or below-target submissions. A reward is created only after all checks pass.

## HTTP API

- `GET /miner/v3/status`
- `POST /miner/v3/work`
- `POST /miner/v3/submit`

Every response identifies `korek-planck-miner/3`. Deployments must use HTTPS and apply edge and per-identity rate limits.

## Mainnet gate

This specification is not a mainnet readiness claim. Before mainnet: freeze canonical serialization and consensus parameters, perform independent security and economic audits, fuzz every decoder and verifier, load-test denial-of-service limits, validate GPU kernels across vendors, implement difficulty adjustment and reorg policy, and complete a public adversarial testnet.
