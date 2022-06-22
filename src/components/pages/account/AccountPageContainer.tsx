// components
import { AccountPageView } from './AccountPageView';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { DashboardContainer } from '../../containers/DashboardContainer';

export function AccountPageContainer() {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <AccountPageView />
      </DashboardLayout>
    </DashboardContainer>
  );
}
