import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

async function getPortals(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { address } = req.session.siwe;

      const hasValidMembership = await verifyMembership(address.toLowerCase());

      if (!hasValidMembership) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const account = await prisma.account.findUnique({
        where: {
          walletAddress: address.toLowerCase()
        }
      });

      const portals = await prisma.portal.findMany({
        where: {
          accountId: account.id
        },
        include: {
          rules: true
        }
      });

      res.send({ portals });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(getPortals);
