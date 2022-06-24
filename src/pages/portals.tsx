// libs
import { withAuthSsr } from '@helpers/withAuthSsr';

// components
import PortalsPageContainer from '@root/src/components/pages/account/portals/PortalsPageContainer';

export default function PortalsPage() {
  return <PortalsPageContainer />;
}

export const getServerSideProps = withAuthSsr(() => {
  return {
    props: {}
  };
});
