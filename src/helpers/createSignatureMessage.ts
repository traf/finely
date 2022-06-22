import { SiweMessage } from 'siwe';

export function createSignatureMessage({
  nonce,
  address,
  chainId
}: {
  nonce: string;
  address: string;
  chainId: number;
}) {
  return new SiweMessage({
    nonce,
    address,
    chainId,
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    statement: 'Sign in with Ethereum to the app.'
  });
}
