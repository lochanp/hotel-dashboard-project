import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signUp as signUpApi } from '../../services/apiAuth';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: user => {
      toast.success("Account Successfully created! Please verify the account from the new user's email.");
    }
  });
  return { signUp, isLoading };
}
