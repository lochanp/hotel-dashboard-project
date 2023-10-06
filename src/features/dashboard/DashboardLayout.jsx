import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import useCabins from '../cabins/useCabins';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 3rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabinsData } = useCabins();

  return (
    <>
      {isLoadingBookings || isLoadingStays || isLoadingCabins ? (
        <Spinner />
      ) : (
        <StyledDashboardLayout>
          <Stats confirmedStays={confirmedStays} bookings={bookings} cabinCount={cabinsData.length} numDays={numDays} />
          <div>Statistics</div>
          <TodayActivity />
          <DurationChart confirmedStays={confirmedStays} />
          <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
      )}
    </>
  );
}
export default DashboardLayout;
