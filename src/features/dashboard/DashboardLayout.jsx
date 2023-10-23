import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';

import Stats from './Stats';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    numDays,
    isLoading: isLoadingStays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  console.log(bookings, stays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Todays Activity</div>
      <div>Chart Stay Durations</div>
      <div>Chart</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
