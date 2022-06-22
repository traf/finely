// libs
import { withSessionSsr } from '@lib/iron';
import { verifyMembership } from '@lib/membership';

// components
import PortalsPageContainer from '@root/src/components/pages/account/portals/PortalsPageContainer';

export default function PortalsPage() {
  return <PortalsPageContainer />;
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.siwe;

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  const hasValidMembership = await verifyMembership(user.address);

  if (!hasValidMembership) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  return {
    props: {}
  };
});
