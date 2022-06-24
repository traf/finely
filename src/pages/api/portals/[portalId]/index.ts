import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { initMiddleware } from '@helpers/initMiddleware';

const corsMiddleware = initMiddleware(
  cors({
    methods: ['GET']
  })
);

export default async function getPortal(req: NextApiRequest, res: NextApiResponse) {
  await corsMiddleware(req, res);
  const { method } = req;
  switch (method) {
    case 'GET': {
      const portalId = req.query.portalId as string;

      if (!portalId) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      const portal = await prisma.portal.findUnique({
        where: {
          id: portalId
        },
        select: {
          name: true,
          redirectUrl: true,
          fallbackPageUrl: true,
          protectedPageUrl: true,
          connectButtonClassName: true,
          walletAddressPlaceholderClassName: true,
          rules: {
            select: {
              tokenIds: true,
              tokenType: true,
              maxBalance: true,
              minBalance: true,
              contractAddress: true
            }
          }
        }
      });

      if (!portal) {
        return res.status(404).send({ error: 'Portal not found.' });
      }

      return res.send({ portal });
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
