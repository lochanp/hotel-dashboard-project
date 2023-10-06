import Button from '../../ui/Button'
import { Modal } from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens='table'>
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  )
}

// export default function AddCabinModal() {
//     const [isOpenModal, setisOpenModal] = useState(false)
//   return (
//     <div>
//         <Button onClick={() => setisOpenModal((show) => !show)}>Add new cabin</Button>
//         {isOpenModal && <Modal onClose={setisOpenModal}><CreateCabinForm onCloseModal={setisOpenModal}/></Modal>}
//     </div>
//   )
// }
