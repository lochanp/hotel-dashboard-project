import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import useCabins from './useCabins'

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

function CabinTable() {
  const { isLoading, cabinsData } = useCabins()
  const [searchParams] = useSearchParams()

  //For filtering
  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins
  if (filterValue == 'all') {
    filteredCabins = cabinsData
  }
  if (filterValue == 'no-discount') {
    filteredCabins = cabinsData?.filter(cabin => cabin.discount == 0)
  }
  if (filterValue == 'with-discount') {
    filteredCabins = cabinsData?.filter(cabin => cabin.discount > 0)
  }

  //For Sorting
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction == 'asc' ? 1 : -1
  const sortedCabins = filteredCabins?.sort((a, b) => a[field] - b[field] * modifier)

  if (isLoading) return <Spinner />
  return (
    <>
      {!cabinsData.length ? (
        <Empty resource='Cabins' />
      ) : (
        <Menus>
          <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
            <Table.Header role='row'>
              <div></div>
              <div>Cabin</div>
              <div>Capacity</div>
              <div>Price</div>
              <div>Discount</div>
              <div></div>
            </Table.Header>
            <Table.Body data={sortedCabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}></Table.Body>
          </Table>
        </Menus>
      )}
    </>
  )
}

export default CabinTable
