# KOREK Planck Mining Template

Canonical, dependency-free reference code and public test vectors for `korek-planck-miner/3`.

This repository exists so node and miner implementations can verify that they serialize work, hash nonces, and apply the proof-of-work target in exactly the same way.

## Testnet status

Planck is an experimental testnet. KRK on Planck has no monetary value. The protocol, CPU worker, and WebGPU worker require security review, fuzzing, load testing, cross-vendor GPU validation, and consensus review before any mainnet launch.

## Run

```bash
npm test
```

See [SPEC.md](SPEC.md) and [vectors/miner-v3.json](vectors/miner-v3.json).

