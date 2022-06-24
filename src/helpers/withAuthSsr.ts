import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { withSessionSsr } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

function withAuth<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;
    const user = req.session.siwe;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: `/siwe?portalId=${process.env.PORTAL_ID}`
        }
      };
    }

    const hasValidMembership = await verifyMembership(user.address);

    if (!hasValidMembership) {
      return {
        redirect: {
          permanent: false,
          destination: process.env.MARKETING_SITE_URL
        }
      };
    }

    return await handler(ctx);
  };
}

export function withAuthSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withSessionSsr(withAuth(handler));
}
