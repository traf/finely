import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from './../../../lib/iron';

async function meRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      res.send({ walletAddress: req.session.siwe?.address });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(meRoute);
