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
        destination: '/siwe?portalId=cl4rz6wmn0118lw0nnsvtvf67',
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
