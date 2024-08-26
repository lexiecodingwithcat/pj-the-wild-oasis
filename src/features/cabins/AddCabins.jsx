import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
// import CabinTable from "./CabinTable";
function AddCabins() {
  return (
    <div>
      <Modal>
        <Modal.Open openWindowName="add">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="add">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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
