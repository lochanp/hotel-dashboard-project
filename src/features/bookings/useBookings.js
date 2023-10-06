import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBookings } from '../../services/apiBookings'
import { PAGE_SIZE } from '../../utils/constants'

export default function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  //filtering the data
  const filteredValue = searchParams.get('status')
  const filter = !filteredValue || filteredValue == 'all' ? null : { field: 'status', value: filteredValue }

  //sort the data
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  //pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  //query
  const { isLoading, data: { data: bookingsData, count } = {} } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  })

  //prefetch the data for next page pagination
  const totalPages = Math.ceil(count / PAGE_SIZE)

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })
  }

  return { isLoading, bookingsData, count }
}
