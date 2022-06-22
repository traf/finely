import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

const updatePortalSchema = z.object({
  portal: z.object({
    name: z.string().min(3, { message: 'Portal name must be at least 3 characters' }),
    tokenType: z.enum(['ERC20', 'ERC721', 'ERC1155'], {
      errorMap: () => ({ message: 'Invalid token type' })
    }),
    fallbackUrl: z.string().url('Invalid fallback URL'),
    protectedUrl: z.string().url('Invalid gated URL'),
    contractAddress: z.string().regex(/0x[a-fA-F0-9]{40}/g)
  })
});

async function updatePortal(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'PATCH': {
      if (!req.query.portalId) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { address } = req.session.siwe;

      const portalId = req.query.portalId as string;
      const hasValidMembership = await verifyMembership(address);

      if (!hasValidMembership) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const account = await prisma.account.findUnique({
        where: {
          walletAddress: address.toLowerCase()
        }
      });

      const updatePortalSchemaValidation = updatePortalSchema.safeParse(req.body);

      if (updatePortalSchemaValidation.success === false) {
        return res.status(400).json({ message: updatePortalSchemaValidation.error.message });
      }

      const data = updatePortalSchemaValidation.data;
      const portal = await prisma.portal.update({
        where: {
          id_accountId: {
            id: portalId,
            accountId: account.id
          }
        },
        data: {
          name: data.portal.name,
          fallbackPageUrl: data.portal.fallbackUrl,
          protectedPageUrl: data.portal.protectedUrl
        }
      });

      const rule = await prisma.portalRule.updateMany({
        where: {
          portalId: portal.id
        },
        data: {
          tokenType: data.portal.tokenType,
          contractAddress: data.portal.contractAddress
        }
      });

      return res.send({
        portal: {
          ...portal,
          rules: [rule]
        }
      });
    }
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(updatePortal);
