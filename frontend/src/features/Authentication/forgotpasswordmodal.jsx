import Modal from "../../components/modal/modal";

export default function ForgotPasswordModal({isOpen, onClose, children}){


    return(

        <Modal
        isOpen={isOpen}
        onClose={onClose}


        
        >
             {children}
        </Modal>
    );
}