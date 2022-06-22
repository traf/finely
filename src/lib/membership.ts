import { getNftBalance } from './nft';

export async function verifyMembership(walletAddress: string) {
  const contractAddresses: any = {
    glass: '0xfcc64c68cd464a968d47ac56bd649f43814d54aa',
    gold: '0xfcc64c68cd464a968d47ac56bd649f43814d54aa',
    holo: '0xfcc64c68cd464a968d47ac56bd649f43814d54aa',
    beta: '0xfcc64c68cd464a968d47ac56bd649f43814d54aa'
  };

  const balancePromises = Object.keys(contractAddresses).map((contractName: string) => {
    return getNftBalance(walletAddress, contractAddresses[contractName]);
  });
  const balancePromisesResult = await Promise.allSettled(balancePromises);

  return balancePromisesResult
    .map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return 0;
    })
    .some((balance) => balance > 0);
}
