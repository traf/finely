import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

const createPortalSchema = z.object({
  portal: z.object({
    name: z.string().min(3, { message: 'Portal name must be at least 3 characters' }),
    tokenType: z.enum(['ERC20', 'ERC721', 'ERC1155'], {
      errorMap: () => ({ message: 'Invalid token type' })
    }),
    mode: z.enum(['ADVANCED', 'REGULAR']),
    fallbackUrl: z.string().url('Invalid fallback URL').optional(),
    protectedUrl: z.string().url('Invalid gated URL').optional(),
    redirectUrl: z.string().url('Invalid redirect URL').optional(),
    contractAddress: z.string().regex(/0x[a-fA-F0-9]{40}/g)
  })
});

async function createPortal(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST': {
      if (!req.session.siwe) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const createPortalSchemaValidation = createPortalSchema.safeParse(req.body);
      if (createPortalSchemaValidation.success === false) {
        return res.status(400).json({ message: createPortalSchemaValidation.error.message });
      }

      const { address } = req.session.siwe;
      const hasValidMembership = await verifyMembership(address.toLocaleLowerCase());

      if (!hasValidMembership) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const account = await prisma.account.findUnique({
        where: {
          walletAddress: address.toLocaleLowerCase()
        }
      });

      if (!account) {
        return res.status(404).json({ message: 'Acccount not Found' });
      }

      // generate a secret key to be used to authenticate request to the api
      // const secretKey = randomBytes(32).toString('hex').toUpperCase();
      // const hashedSecret = await bcrypt.hash(secretKey, 10);

      // create the portal
      const data = createPortalSchemaValidation.data;
      const portal = await prisma.portal.create({
        data: {
          name: data.portal.name,
          mode: data.portal.mode,
          account: {
            connect: {
              id: account.id
            }
          },
          redirectUrl: data.portal.redirectUrl || '',
          fallbackPageUrl: data.portal.fallbackUrl || '',
          protectedPageUrl: data.portal.protectedUrl || '',
          connectButtonClassName: 'fnly-connect',
          walletAddressPlaceholderClassName: 'fnly-wallet-placeholder',
          rules: {
            create: [
              {
                tokenType: data.portal.tokenType,
                contractAddress: data.portal?.contractAddress?.toLowerCase()
              }
            ]
          }
        },
        include: {
          rules: true
        }
      });

      return res.send({ portal });
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(createPortal);
