import { generateNonce } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/iron';

async function nonceRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      req.session.nonce = generateNonce();
      await req.session.save();
      res.send({ nonce: req.session.nonce });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(nonceRoute);
