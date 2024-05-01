import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { formatPath } from '../helpers/format-path';

const Diagram = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fullPathString = location.pathname.replace('/diagram/', '/diagrams/');
    const pathString = location.pathname.split('/diagram/')[1];
    const diagramName = formatPath(location.state?.path);
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
                    Diagram for: {fullPathString}
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
