import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // Uniquely identify the data, must be array
    // If another component wants to use the data, this key can be used to read from cache
    queryKey: ['cabins'],
    // Function which is responsible for fetching data from API, must return a promise
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
