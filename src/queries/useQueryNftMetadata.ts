import axios from 'axios';
import { Contract } from 'ethers';
import { useQuery } from 'react-query';

export interface UseNftInfoProps {
  tokenId: string;
  contract: Contract;
  type: 'erc721' | 'erc1155';
}

export const useQueryNftMetadata = ({ contract, tokenId, type }: UseNftInfoProps) => {
  async function fecther() {
    const tokenUri =
      type === 'erc721' ? await contract.tokenURI(tokenId) : await contract.uri(tokenId);
    const { data } = await axios.get(tokenUri);
    return data;
  }

  return useQuery(['queryNftMetadata', contract.address, tokenId, type], fecther);
};
