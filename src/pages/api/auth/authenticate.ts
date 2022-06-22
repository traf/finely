import { z } from 'zod';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@lib/prisma';
import { withSessionRoute } from '@lib/iron';

const authenticateRouteSchema = z.object({
  code: z.string()
});

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const authenticateRouteSchemaValidation = authenticateRouteSchema.safeParse(req.query);

        if (authenticateRouteSchemaValidation.success === false) {
          return res.status(400).json({ message: authenticateRouteSchemaValidation.error.message });
        }

        const { code } = authenticateRouteSchemaValidation.data;
        const { message, signature } = JSON.parse(Buffer.from(code, 'base64').toString('utf8'));

        const generateMessage = new SiweMessage(message);
        const walletFromSignature = ethers.utils.verifyMessage(
          generateMessage.toMessage(),
          signature
        );

        if (walletFromSignature.toLocaleLowerCase() !== message.address.toLocaleLowerCase()) {
          return res.redirect('/?error=invalid_signature');
        }

        req.session.siwe = message;
        await req.session.save();

        // verify if there is already an account with this address
        let account = await prisma.account.findUnique({
          where: {
            walletAddress: message.address.toLowerCase()
          }
        });

        // if not, create one
        if (!account) {
          account = await prisma.account.create({
            data: {
              walletAddress: message.address.toLowerCase()
            }
          });
        }

        return res.redirect('/');
      } catch (_error) {
        console.log(_error);
        return res.status(401).json({ ok: false, message: 'Unauthorized' });
      }
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}

export default withSessionRoute(authenticate);
