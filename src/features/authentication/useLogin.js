import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate('/dashboard', { replace: true })
    },
    onError: err => {
      toast.error('Please check the provided email or password')
      console.log('ERROR', err)
    }
  })
  return { login, isLoading }
}
