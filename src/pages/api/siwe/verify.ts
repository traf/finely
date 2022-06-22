import { z } from 'zod';
import { SiweMessage } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/iron';

const loginRouteSchema = z.object({
  message: z.object({
    uri: z.string(),
    nonce: z.string(),
    domain: z.string(),
    version: z.string(),
    address: z.string(),
    chainId: z.number(),
    issuedAt: z.string(),
    statement: z.string()
  }),
  // redirectUri: z.string().url('Invalid URI'),
  // appId: z.string().min(1, 'App ID cannot be empty'),
  signature: z.string().min(1, 'Signature cannot be empty')
});

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const loginRouteSchemaValidation = loginRouteSchema.safeParse(req.body);

        if (loginRouteSchemaValidation.success === false) {
          return res.status(400).json({ message: loginRouteSchemaValidation.error.message });
        }

        const { message, signature } = loginRouteSchemaValidation.data;

        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);

        if (fields.nonce !== req.session.nonce) {
          return res.status(422).json({ message: 'Invalid nonce.' });
        }

        req.session.siwe = fields;
        await req.session.save();

        const authObject = {
          message,
          signature
        };

        const codeBuffer = Buffer.from(JSON.stringify(authObject));
        const code = codeBuffer.toString('base64');

        res.json({ ok: true, code, walletAddress: fields.address.toLowerCase() });
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
