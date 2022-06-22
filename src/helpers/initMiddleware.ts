import { NextApiRequest, NextApiResponse } from 'next';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function initMiddleware(
  middleware: (req: NextApiRequest, res: NextApiResponse, cb: (result: any) => any) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
