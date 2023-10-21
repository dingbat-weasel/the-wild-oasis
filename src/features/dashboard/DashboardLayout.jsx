import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  console.log(bookings, stays);
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Todays Activity</div>
      <div>Chart Stay Durations</div>
      <div>Chart</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
