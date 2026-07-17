import Modal from "../../../components/modal/modal";


export default function ProjectModal({ isOpen, onClose, title, mode, children }) {

  const handleSubmit = (data) => {
    console.log("Project Data:", data);
    onClose();
  };

  return (
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}
     title={title}
    >
      { children }
    </Modal>
  );
}