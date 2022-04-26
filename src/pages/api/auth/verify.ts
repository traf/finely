import { SiweMessage } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from './../../../lib/iron';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);

        if (fields.nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' });

        req.session.siwe = fields;
        await req.session.save();
        res.json({ ok: true, walletAddress: fields.address });
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
