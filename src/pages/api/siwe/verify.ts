import { z } from 'zod';
import { SiweMessage } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/iron';
import { prisma } from '@root/src/lib/prisma';

const verifyRouteSchema = z.object({
  message: z.string().min(1, 'message cannot be empty'),
  portalId: z.string().min(1, 'portalId cannot be empty'),
  signature: z.string().min(1, 'signature cannot be empty')
});

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const verifyRouteSchemaValidation = verifyRouteSchema.safeParse(req.query);

        if (verifyRouteSchemaValidation.success === false) {
          return res.status(400).json({ message: verifyRouteSchemaValidation.error.message });
        }

        const { message, signature, portalId } = verifyRouteSchemaValidation.data;

        const portal = await prisma.portal.findUnique({
          where: {
            id: portalId
          },
          select: {
            redirectUrl: true
          }
        });

        if (!portal) {
          const queryParams = new URLSearchParams({ error: 'Portal not found' });
          return res.redirect(`${portal.redirectUrl}?${queryParams}`);
        }

        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);

        if (fields.nonce !== req.session.nonce) {
          const queryParams = new URLSearchParams({ error: 'Invalid or expired nonce.' });
          return res.redirect(`${portal.redirectUrl}?${queryParams}`);
        }

        req.session.siwe = fields;
        await req.session.save();

        const authObject = {
          signature,
          message: siweMessage
        };

        const codeBuffer = Buffer.from(JSON.stringify(authObject));
        const code = codeBuffer.toString('base64');

        const queryParams = new URLSearchParams({ code });
        return res.redirect(`${portal.redirectUrl}?${queryParams}`);
      } catch (_error) {
        console.log(_error);
        res.status(401).json({ ok: false, message: 'Unauthorized' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(loginRoute);
