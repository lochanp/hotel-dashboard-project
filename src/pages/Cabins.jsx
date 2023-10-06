import { useEffect } from 'react'
import AddCabinModal from '../features/cabins/AddCabinModal'
import CabinTable from '../features/cabins/CabinTable'
import CabinTableOperations from '../features/cabins/CabinTableOperations'
import { getCabins } from '../services/apiCabins'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Cabins() {
  useEffect(() => {
    getCabins().then(data => console.log(data))
  }, [])

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabinModal />
      </Row>
    </>
  )
}

export default Cabins
