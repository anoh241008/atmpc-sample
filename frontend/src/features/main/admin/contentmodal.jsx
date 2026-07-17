// features/contents/contentmodal.jsx
import Modal from "../../../components/modal/modal";

export default function ContentModal({ isOpen, onClose, title, mode, children }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            {children}  {/* ← just render children, nothing else */}
        </Modal>
    );
} 