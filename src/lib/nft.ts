import { providers, Contract } from 'ethers';

// abis
import ERC721 from './../data/abi/erc721.json';

const provider = new providers.InfuraProvider('homestead', {
  projectId: process.env.INFURA_ID
});

export async function getNftBalance(
  walletAddress: string,
  contractAddress: string
): Promise<number> {
  const contract = new Contract(contractAddress, ERC721, provider);
  const balance = await contract.balanceOf(walletAddress);
  const balanceNumber = balance.toNumber();
  return balanceNumber;
}
