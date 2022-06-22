import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const account = await prisma.account.findUnique({
        where: {
          walletAddress: req.session.siwe.address.toLowerCase()
        }
      });

      if (!account) {
        return res.status(404).json({ message: 'Account not found Found' });
      }

      return res.send({ walletAddress: req.session.siwe?.address.toLowerCase() });
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(userRoute);
