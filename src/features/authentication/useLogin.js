import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();

  // A mutation because something is changing on the server, also a lot easier to handle success and error states
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      navigate('/dashboard');
    },

    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password is incorrect');
    },
  });

  return { login, isLoading };
}
