import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeleteRole({ show, handleClose, confirmDeleteRole, role }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, are you sure to delete this {role.url}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDeleteRole}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteRole;
