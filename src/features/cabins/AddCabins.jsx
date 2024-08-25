import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
// import CabinTable from "./CabinTable";
function AddCabins() {
  return (
    <Modal>
      <Modal.Open openWindowName="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open openWindowName="cabin-table"><Button>show TABLE</Button></Modal.Open>
      <Modal.Window name='cabin-table'>
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

// function AddCabins() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((open) => !open)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && <Modal onClose={()=>setIsOpenModal(false)}><CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/></Modal>}
//     </div>
//   );
// }

export default AddCabins;
