import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // Uniquely identify the data, must be array
    // If another component wants to use the data, this key can be used to read from cache
    queryKey: ['booking', bookingId],
    // Function which is responsible for fetching data from API, must return a promise
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}
