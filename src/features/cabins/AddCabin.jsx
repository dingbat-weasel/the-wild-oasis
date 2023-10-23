import CreateCabinForm from './CreateCabinForm';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// This original AddCabin comp below does not allow the modal to maintain its own logic. it is preferable for the modal component to know whether it is open or not, control this logic itself, and decide what is contained within itself. For this we use the compound component structure above

/*
function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add New Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
*/

export default AddCabin;
