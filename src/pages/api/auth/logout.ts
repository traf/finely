import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from './../../../lib/iron';

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'DELETE':
      req.session.destroy();
      res.send({ ok: true });
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withSessionRoute(logoutRoute);
