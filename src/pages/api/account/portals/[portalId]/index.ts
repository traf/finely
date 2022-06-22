import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

async function getPortal(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const portalId = req.query.portalId as string;
      if (!portalId) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { address } = req.session.siwe;
      const hasValidMembership = await verifyMembership(address);

      if (!hasValidMembership) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const account = await prisma.account.findUnique({
        where: {
          walletAddress: address.toLowerCase()
        }
      });

      const portal = await prisma.portal.findUnique({
        where: {
          id_accountId: {
            id: portalId,
            accountId: account.id
          }
        }
      });

      return res.send({ portal });
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(getPortal);
