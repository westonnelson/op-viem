# readProvenWithdrawals

Returns a `ProvenWithdrawal` struct containing the `outputRoot`, `timestamp`, and `l2OutputIndex` for a given withdrawal hash. Returns error if withdrawal has not been proven.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const provenWithdrawal = await readProvenWithdrawals(publicClient, {
  l2Chain: base,
  withdrawalHash:
    '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})
```

## Return Value

Returns an object that represents a `ProvenWithdrawl` struct that contains the `outputRoot`, `timestamp`, and `l2OutputIndex`

## Parameters

### l2chain (optional)

- **Type:** `OpStackChain`

### optimismPortalAddress (optional)

- **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)

The `OptimismPortal` contract where the sendMessage call should be made. MUST be specified if [l2Chain](#l2chain-optional) not passed.

The L2 chain to deposit to.

### withdrawalHash

- **Type:** `Hex`

The hash of the withdrawal