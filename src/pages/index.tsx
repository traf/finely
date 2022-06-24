// libs
import { withAuthSsr } from '@helpers/withAuthSsr';

// components
import { AccountPageContainer } from '@components/pages/account/AccountPageContainer';

export default function AccountPage() {
  return <AccountPageContainer />;
}

export const getServerSideProps = withAuthSsr(() => {
  return {
    props: {}
  };
});
