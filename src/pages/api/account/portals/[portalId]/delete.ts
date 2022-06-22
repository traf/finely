import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

async function deletePortal(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'DELETE': {
      if (!req.query.portalId) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { address } = req.session.siwe;
      const portalId = req.query.portalId as string;
      const hasValidMembership = await verifyMembership(address.toLowerCase());

      if (!hasValidMembership) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const account = await prisma.account.findUnique({
        where: {
          walletAddress: address.toLowerCase()
        }
      });

      await prisma.portal.delete({
        where: {
          id_accountId: {
            id: portalId,
            accountId: account.id
          }
        }
      });

      return res.send({ ok: true });
    }
    default: {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}

export default withSessionRoute(deletePortal);
