import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // For notes on these queries check useCabins
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
