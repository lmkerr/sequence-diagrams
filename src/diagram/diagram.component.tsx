import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Diagram = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathString = location.pathname.split('/diagram/')[1];
    const diagramName = location.state?.diagramName;
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        if(!diagramName) {
            console.log('No diagram url provided. Redirecting to home page.');
            navigate('/');
        }
        setShowModal(true);
    }, [navigate,diagramName, pathString]);

    const handleClose = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <Modal show={showModal} onHide={handleClose} fullscreen={true} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title>{diagramName ?? 'Diagram'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Diagram for: {pathString}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { Diagram };
