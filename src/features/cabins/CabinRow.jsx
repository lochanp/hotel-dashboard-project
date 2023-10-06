import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import { Modal } from '../../ui/Modal'
import Table from '../../ui/Table'
import { formatCurrency } from '../../utils/helpers'
import CreateCabinForm from './CreateCabinForm'
import useCreateCabin from './useCreateCabin'
import useDeleteCabin from './useDeleteCabin'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin()
  // const queryClient = useQueryClient();
  // const {isLoading,mutate} = useMutation({
  //   mutationFn: (id) => deleteCabin(id),
  //   onSuccess :() => {
  //     toast.success('Cabin successfully Deleted');
  //     queryClient.invalidateQueries({
  //       queryKey : ['cabins']
  //     })
  //   },
  //   onError : err => toast.error(err.message)
  // })

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image,
      description: cabin.description
    })
  }

  return (
    <Table.Row role='row'>
      <Img src={cabin.image}></Img>
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      {cabin.discount ? <Discount>{formatCurrency(cabin.discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />
            <Menus.List id={cabin.id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => {
                  handleDuplicate()
                }}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name='edit'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='cabins' onConfirm={() => deleteCabin(cabin.id)} disabled={isDeleting} />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
