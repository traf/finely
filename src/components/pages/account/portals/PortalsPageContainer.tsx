// components
import { PortalsPageView } from './PortalsPageView';
import { DashboardLayout } from '@components/layout/DashboardLayout';
import { DashboardContainer } from '@root/src/components/containers/DashboardContainer';

export default function PortalsPageContainer() {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <PortalsPageView />
      </DashboardLayout>
    </DashboardContainer>
  );
}
