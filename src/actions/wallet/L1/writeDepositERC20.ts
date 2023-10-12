import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { ABI, CONTRACT, type DepositERC20Parameters, FUNCTION } from '../../../types/depositERC20.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'
import { writeOpStackL1, type WriteOpStackL1Parameters } from './writeOpStackL1.js'

export type WriteDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositERC20Parameters; l1StandardBridge: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link WriteDepositERC20Parameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { l1Token, l2Token, to, amount, minGasLimit, extraData = '0x' },
    l1StandardBridge,
    ...rest
  }: WriteDepositERC20Parameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: resolveAddress(l1StandardBridge),
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [l1Token, l2Token, to, amount, minGasLimit, extraData],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
