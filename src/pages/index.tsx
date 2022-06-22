import { withSessionSsr } from '@lib/iron';

// libs
import { verifyMembership } from '@lib/membership';

// components
import { AccountPageContainer } from '@components/pages/account/AccountPageContainer';

export default function AccountPage() {
  return <AccountPageContainer />;
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.siwe;

  if (!user) {
    return {
      redirect: {
        destination: '/siwe?redirectUri=http://localhost:3000/api/auth/authenticate&clientId=0x123',
        permanent: false
      }
    };
  }

  const hasValidMembership = await verifyMembership(user.address);

  if (!hasValidMembership) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
});
