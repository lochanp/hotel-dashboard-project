import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'

export default function useDeleteBooking() {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: id => deleteBookingApi(id),
    onSuccess: () => {
      toast.success('Booking successfully Deleted')
      queryClient.invalidateQueries({
        queryKey: ['booking']
      })
    },
    onError: err => toast.error(err.message)
  })
  return { isDeleting, deleteBooking }
}
