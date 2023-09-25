import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // Mutating data
  // mutate is a callback function we can connect with the button in this case
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    // Function react query will call
    mutationFn: deleteCabinApi,
    // to invalidate cache as soon as function is called we can use onSuccess fn, in order to prompt refetch of data and refresh of UI
    // need to get Query Client and call invalidate queries directly on there using hook: useQueryClient (initialized above)
    onSuccess: () => {
      // notification using toaster fn
      toast.success('Cabin successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
