import Modal from "../../../components/modal/modal";

export default function RoomModal({isOpen, onClose, title, children}){

    return(

        <Modal  isOpen={isOpen} onClose={onClose}   title={title}>

            {children}

        </Modal>

    )

} 



