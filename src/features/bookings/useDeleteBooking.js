import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  // Mutating data
  // mutate is a callback function we can connect with the button in this case
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    // Function react query will call
    mutationFn: deleteBookingApi,
    // to invalidate cache as soon as function is called we can use onSuccess fn, in order to prompt refetch of data and refresh of UI
    // need to get Query Client and call invalidate queries directly on there using hook: useQueryClient (initialized above)
    onSuccess: () => {
      // notification using toaster fn
      toast.success('Booking successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
